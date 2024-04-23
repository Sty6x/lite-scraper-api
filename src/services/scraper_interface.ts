import { BrowserType, ChromiumBrowser, chromium } from "playwright";
import { user_query } from "../types/user_query_types";
import { Scraper } from "./scraper";
import { scraped_data } from "../types/scraper_types";

export class ScraperInterface extends Scraper {
  private chrome: BrowserType<ChromiumBrowser>;
  constructor(user_query: user_query) {
    super(user_query);
    this.chrome = chromium;
  }

  public async initialize_scraper() {
    const user_agent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    this.browser = await this.chrome.launch();
    this.page = await this.browser.newPage({ userAgent: user_agent });
    await this.page.goto(this.query.websiteURL);
  }

  public async single_page(): Promise<scraped_data> {
    try {
      const scraped_data = await this.scrape();
      const new_data: scraped_data = {
        ...this.query,
        queriedData: scraped_data,
      };
      this.browser?.close();
      return new_data;
    } catch (e) {
      console.log(e);
      return { ...this.query, queriedData: [] };
    }
  }

  public async multi_page(): Promise<scraped_data> {
    try {
      if (!this.query.multipageConfig) throw Error;
      const { end_page, starting_page } = this.query.multipageConfig;
      const pages = [];
      let end = end_page;
      let page_count = starting_page;
      while (page_count < end + 1) {
        const scraped_data = await this.scrape();
        pages.push({ page: page_count, queriedData: scraped_data });
        page_count++;
        await this.page?.goto(
          "https://www.amazon.ae/s?k=phones&page=2&ref=sr_pg_2"
        );
      }
      console.log(pages);
      console.log(pages[0].queriedData[0]);
      console.log(pages[1].queriedData[0]);
      this.browser?.close();
      return { ...this.query, queriedData: pages };
    } catch (e) {
      console.log(e);
      this.browser?.close();
      return { ...this.query, queriedData: [] };
    }
  }
}
