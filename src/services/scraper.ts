import { WebDriver } from "selenium-webdriver";
import chromeDriver, { CustomWebDriver } from "../utils/chrome_driver";
import { error } from "console";
import { user_query } from "../types/user_query";

export class Scraper {
  private driver: CustomWebDriver;
  constructor(custom_driver: CustomWebDriver) {
    this.driver = custom_driver;
  }
  async testScrape(user_query: user_query): Promise<void> {
    let chrome = await this.driver.get_driver();
    try {
      if (chrome === null) throw error;
      await chrome.get(user_query.websiteURL);
      console.log(await chrome.getTitle());
    } catch (error) {
      console.error("Driver does not exist.");
    }
  }
}
