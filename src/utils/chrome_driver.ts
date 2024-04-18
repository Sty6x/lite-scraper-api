import { Builder, ChromiumWebDriver, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

export class CustomWebDriver {
  private static instance: CustomWebDriver | null = null;

  static get_instance() {
    if (this.instance == null) {
      this.instance = new CustomWebDriver();
    }
    return this.instance;
  }

  private async driver_initializer(): Promise<WebDriver | null> {
    const chromeOption = new chrome.Options();
    chromeOption.addArguments("--headless=new");
    try {
      let driver = await new Builder()
        .setChromeOptions(chromeOption)
        .forBrowser("chrome")
        .build();
      return driver;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  public async get_driver(): Promise<WebDriver | null> {
    return await this.driver_initializer();
  }
}
const chromeDriver = CustomWebDriver.get_instance();
export default chromeDriver;
