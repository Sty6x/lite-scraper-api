import { By, WebDriver, WebElement, until } from "selenium-webdriver";
import { CustomWebDriver } from "../utils/custom_web_driver";
import { error } from "console";
import { user_query } from "../types/user_query";
import { REPL_MODE_STRICT } from "repl";
import { captureRejectionSymbol } from "events";

export class Scraper {
  private driver: CustomWebDriver;
  constructor(custom_driver: CustomWebDriver) {
    this.driver = custom_driver;
  }
  async scrape({ websiteURL, dataQuery }: user_query): Promise<void> {
    let chrome = await this.driver.get_driver();

    try {
      if (chrome === null) throw error;
      const test_selector = Object.values(dataQuery)[1];
      let retries = 10;

      async function retry_element_search(chrome: WebDriver, retries: number) {
        if (chrome === null) throw error;
        try {
          await chrome.manage().setTimeouts({ implicit: 2000 });
          await chrome.get(websiteURL);
          const g = await chrome.findElements(By.css(".amount"));
          console.log(g[0]);
          if (g[0] === undefined) {
            throw error;
          }
        } catch (e) {
          console.log(retries);
          retries--;
          if (retries > 0) return retry_element_search(chrome, retries);
          console.error(e);
          return;
        }
      }
      await retry_element_search(chrome, retries);

      console.log(await chrome.getTitle());
      // const raw_data = await this.get_raw_query_data(chrome, dataQuery);
      // const populated_query = await this.get_data(
      //   raw_data as Array<WebElement[]>,
      //   dataQuery
      // );
      // console.log(populated_query);
    } catch (error) {
      console.error("Something went wrong.");
      console.error(error);
    }
  }

  private async get_raw_query_data(
    chrome: WebDriver,
    dataQuery: { [key: string]: any }
  ) {
    if (chrome === null) return;
    const query_values = Object.values(dataQuery);
    const map_query = query_values.map(async (query) => {
      try {
        const g = await chrome.findElements(By.css(query));
        return g;
      } catch (e) {
        throw error(e);
      }
    });
    const raw_data = await Promise.all(map_query);
    return raw_data;
  }

  private async get_data(
    raw_data: Array<WebElement[]>,
    data_query: { [key: string]: any }
  ) {
    const query_keys = Object.keys(data_query);
    const populate_query = raw_data[0].map(async (_, i) => {
      let populated_query: { [key: string]: any } = {};
      for (let j = 0; j < query_keys.length; j++) {
        const query_item = raw_data[j][i];
        if (query_item === undefined) break;
        populated_query[query_keys[j]] = await query_item.getText();
      }
      return populated_query;
    });
    const resolve_text_data = await Promise.all(populate_query);
    return resolve_text_data;
  }
}
