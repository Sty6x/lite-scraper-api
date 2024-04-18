import { WebDriver } from "selenium-webdriver";
import chromeDriver, { CustomWebDriver } from "../utils/chrome_driver";

class Scraper {
  private driver: CustomWebDriver;
  constructor(custom_driver: CustomWebDriver) {
    this.driver = custom_driver;
  }
  async testScrape(userQuery: {
    [key: string]: any;
    webURL: string;
  }): Promise<void> {
    let l = await this.driver.get_driver();
    console.log(typeof l);
    return;
  }
}
const scraper = new Scraper(chromeDriver);
scraper.testScrape({ data: "njgee", webURL: "da" });
