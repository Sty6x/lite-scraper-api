import { CustomWebDriver } from "../utils/custom_web_driver";
import { chromium } from "playwright";
import { error } from "console";
import { user_query } from "../types/user_query";

export class Scraper {
  private driver: CustomWebDriver;
  constructor(custom_driver: CustomWebDriver) {
    this.driver = custom_driver;
  }
  async scrape({ websiteURL, dataQuery }: user_query): Promise<void> {
    try {
      const user_agent =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
      const browser = await chromium.launch();
      const page = await browser.newPage({ userAgent: user_agent });
      await page.goto(websiteURL);
      await page.screenshot({ path: "here.png" });
      await page.close();
    } catch (error) {
      console.error("Something went wrong.");
      console.error(error);
    }
  }
}
