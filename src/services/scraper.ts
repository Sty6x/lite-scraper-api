import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

class ChromeDriver {
  static instance: ChromeDriver | null = null;
  webDriver: Promise<WebDriver | null>;

  constructor(driver_initializer: () => Promise<WebDriver | null>) {
    this.webDriver = driver_initializer();
  }

  static get_instance() {
    if (this.instance == null) {
      this.instance = new ChromeDriver(this.driver_initializer);
    }
    return this.instance;
  }

  static async driver_initializer(): Promise<WebDriver | null> {
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
}
const chromeDriver = ChromeDriver.get_instance();
export default chromeDriver;
