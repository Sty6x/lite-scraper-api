import { By, until } from "selenium-webdriver";
import { CustomWebDriver } from "../utils/chrome_driver";
import { error } from "console";
import { user_query } from "../types/user_query";

export class Scraper {
  private driver: CustomWebDriver;
  constructor(custom_driver: CustomWebDriver) {
    this.driver = custom_driver;
  }
  async scrape({ websiteURL, dataQuery }: user_query): Promise<void> {
    let chrome = await this.driver.get_driver();
    try {
      if (chrome === null) throw error;
      await chrome.get(websiteURL);
      console.log(await chrome.getTitle());
      const tmp_data_arr_count = await chrome.findElements(
        By.css(Object.values(dataQuery)[0])
      );
      const items = tmp_data_arr_count.map(async () => {
        const query_values = Object.values(dataQuery);
        const query_keys = Object.keys(dataQuery);
        let populated_query: { [key: string]: any } = {};
        const bulk_fetch = query_values.map(async (_, i) => {
          const item = chrome.findElement(By.css(query_values[i]));
          return item;
        });
        const p = await Promise.all(bulk_fetch);
        for (let i = 0; i < query_values.length; i++) {
          populated_query[query_keys[i]] = await p[i].getText();
        }
        console.log(await p[0].getText());
        return populated_query;
      });
      const fetched_items = await Promise.all(items);
      console.log(fetched_items);
    } catch (error) {
      console.error("Driver does not exist.");
    }
  }
}
