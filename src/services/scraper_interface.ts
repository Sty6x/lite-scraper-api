import { BrowserType, ChromiumBrowser, chromium } from "playwright";
import { user_query } from "../types/user_query_types";
import { Scraper } from "./scraper";
import { scraper } from "../types/scraper_types";

export class ScraperInterface extends Scraper {
  private chrome: BrowserType<ChromiumBrowser>;
  constructor(user_query: user_query) {
    super(user_query);
    this.chrome = chromium;
  }

  public async initialize_scraper() {
    const user_agent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    const browser = await this.chrome.launch();
    const page = await browser.newPage({ userAgent: user_agent });
    this.page = page;
    await page.goto(this.query.websiteURL);
  }

  public async single_page_scrape(): Promise<scraper> {
    const scraped_data = await this.scrape();
    const new_data: scraper = {
      ...this.query,
      queriedData: scraped_data,
    };
    return new_data;
  }

  public async multi_page() {
    try {
      if (!this.query.multipageConfig) throw Error;
      const { end_page, starting_page } = this.query.multipageConfig;
      const pages = [];
      const d: { [key: string]: any } = {};
      let end = end_page;
      let page_count = starting_page;
      while (page_count < end) {
        const scraped_data = await this.scrape();
        d[page_count.toString()] = scraped_data;
        pages.push(d[page_count]);
        page_count++;
      }
      console.log(d);
      console.log(starting_page);
    } catch (e) {}
  }
}
