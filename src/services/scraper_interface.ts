import { BrowserType, ChromiumBrowser, chromium } from "playwright";
import { t_task, scraped_data } from "../types/project_types";
import { Scraper } from "./scraper";

export class ScraperInterface extends Scraper {
  private chrome: BrowserType<ChromiumBrowser>;
  constructor(task: t_task) {
    super(task);
    this.chrome = chromium;
  }

  public async initialize_scraper() {
    const user_agent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    this.browser = await this.chrome.launch();
    this.page = await this.browser.newPage({ userAgent: user_agent });
    await this.page.goto(this.task.websiteURL);
  }

  public async single_page(): Promise<t_task> {
    try {
      const scraped_data = await this.scrape();
      const new_task: t_task = {
        ...this.task,
        data: scraped_data,
      };
      this.browser?.close();
      return new_task;
    } catch (e) {
      console.log(e);
      return { ...this.task, data: [] };
    }
  }

  public async multi_page(): Promise<t_task> {
    try {
      if (!this.task.multipageConfig) throw Error;
      const { end_page, starting_page } = this.task.multipageConfig;
      const pages = [];
      let end = end_page;
      let page_count = starting_page;
      while (page_count < end + 1) {
        const scraped_data = await this.scrape();
        pages.push({ page: page_count, pageData: scraped_data });
        page_count++;
        await this.page?.goto(
          "https://www.amazon.ae/s?k=phones&page=2&ref=sr_pg_2",
        );
      }
      this.browser?.close();
      return { ...this.task, data: pages };
    } catch (e) {
      console.log(e);
      this.browser?.close();
      return { ...this.task, data: [] };
    }
  }
}
