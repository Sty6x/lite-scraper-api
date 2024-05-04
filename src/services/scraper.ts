import { Browser, Locator, Page, chromium } from "playwright";
import { error } from "console";
import { t_task, task_schema } from "../types/project_types";

export class Scraper {
  task: t_task;
  page: Page | null;
  browser: Browser | null;
  constructor(new_task: t_task) {
    this.task = new_task;
    this.page = null;
    this.browser = null;
  }
  async scrape(): Promise<Array<task_schema>> {
    try {
      const raw_data = await this.get_raw_data();
      const populated_query = await this.get_data(raw_data as Array<Locator[]>);
      return populated_query;
    } catch (error) {
      console.error("Something went wrong.");
      console.error(error);
      await this.browser?.close();
      return [];
    }
  }

  private async get_raw_data() {
    const task_schema_values = Object.values(this.task.taskSchema);
    const map_schema = task_schema_values.map(async (value) => {
      try {
        if (!this.page) throw error;
        const located_items = await this.page.locator(value).all();
        return located_items;
      } catch (e) {
        throw error(e);
      }
    });
    const raw_data = await Promise.all(map_schema);
    return raw_data;
  }
  private async get_data(
    raw_data: Array<Locator[]>,
  ): Promise<Array<task_schema>> {
    const task_keys = Object.keys(this.task.taskSchema);
    const populate_query = raw_data[0].map(async (_, i) => {
      let populated_query: { [key: string]: any } = {};
      for (let j = 0; j < task_keys.length; j++) {
        const query_item = raw_data[j][i];
        if (query_item === undefined) break;
        const data = await query_item.textContent();
        populated_query[task_keys[j]] = data?.trim();
      }
      return populated_query;
    });
    const resolve_text_data = await Promise.all(populate_query);
    return resolve_text_data;
  }
}
