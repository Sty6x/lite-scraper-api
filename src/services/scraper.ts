import { Locator, Page, chromium } from "playwright";
import { error } from "console";
import { user_query } from "../types/user_query";

export class Scraper {
  query: user_query;
  constructor(user_query: user_query) {
    this.query = user_query;
  }
  public async scrape(): Promise<user_query> {
    const browser = await chromium.launch();
    try {
      const user_agent =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
      const page = await browser.newPage({ userAgent: user_agent });
      await page.goto(this.query.websiteURL);
      await page.mouse.wheel(0, 1000);
      const raw_data = await this.get_raw_data(page);
      const populated_query = await this.get_data(raw_data as Array<Locator[]>);
      return { ...this.query, dataQuery: populated_query };
    } catch (error) {
      console.error("Something went wrong.");
      console.error(error);
      await browser.close();
      return this.query;
    }
  }

  public async multi_page() {
    if (!this.query.multipageConfig) return;
    const { end_page, starting_page } = this.query.multipageConfig;
    const pages = [];
    const d: { [key: string]: any } = {};
    let end = end_page;
    let starting = starting_page;
    while (starting < end) {
      d[starting.toString()] = [];
      starting++;
    }
    console.log(d);
    console.log(starting_page);
  }

  private async get_raw_data(page: Page) {
    const query_values = Object.values(this.query.dataQuery);
    const map_query = query_values.map(async (query) => {
      try {
        const queried_items = await page.locator(query).all();
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
