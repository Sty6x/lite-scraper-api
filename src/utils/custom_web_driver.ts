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
    const user_agent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    chromeOption.setPageLoadStrategy("eager");
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
