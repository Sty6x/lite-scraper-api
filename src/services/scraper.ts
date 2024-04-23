import { Locator, Page, chromium } from "playwright";
import { error } from "console";
import { user_query } from "../types/user_query";

export class Scraper {
  query: user_query;
  page: Page | null;
  constructor(user_query: user_query) {
    this.query = user_query;
    this.page = null;
  }
  async scrape(): Promise<user_query> {
    const browser = await chromium.launch();
    try {
      const raw_data = await this.get_raw_data();
      const populated_query = await this.get_data(raw_data as Array<Locator[]>);
      await browser.close();
      return { ...this.query, dataQuery: populated_query };
    } catch (error) {
      console.error("Something went wrong.");
      console.error(error);
      await browser.close();
      return this.query;
    }
  }

  private async get_raw_data() {
    const query_values = Object.values(this.query.dataQuery);
    const map_query = query_values.map(async (query) => {
      try {
        if (!this.page) throw error;
        const queried_items = await this.page.locator(query).all();
        return queried_items;
      } catch (e) {
        throw error(e);
      }
    });
    const raw_data = await Promise.all(map_query);
    return raw_data;
  }
  private async get_data(raw_data: Array<Locator[]>) {
    const query_keys = Object.keys(this.query.dataQuery);
    const populate_query = raw_data[0].map(async (_, i) => {
      let populated_query: { [key: string]: any } = {};
      for (let j = 0; j < query_keys.length; j++) {
        const query_item = raw_data[j][i];
        if (query_item === undefined) break;
        const data = await query_item.textContent();
        populated_query[query_keys[j]] = data?.trim();
      }
      return populated_query;
    });
    const resolve_text_data = await Promise.all(populate_query);
    return resolve_text_data;
  }
}
