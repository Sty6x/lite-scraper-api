import { BrowserType, ChromiumBrowser, Page, chromium } from "playwright";
import { user_query } from "../types/user_query";
import { Scraper } from "./scraper";

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

  // public async multi_page() {
  //   if (!this.query.multipageConfig) return;
  //   const { end_page, starting_page } = this.query.multipageConfig;
  //   const pages = [];
  //   const d: { [key: string]: any } = {};
  //   let end = end_page;
  //   let starting = starting_page;
  //   while (starting < end) {
  //     d[starting.toString()] = [];
  //     starting++;
  //   }
  //   console.log(d);
  //   console.log(starting_page);
  // }
}
