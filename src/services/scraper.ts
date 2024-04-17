import { Browser, Builder, until, Key, By } from "selenium-webdriver";

export default async function driverInializer() {
  let driver = new Builder().forBrowser("chrome").build();
  try {
    await driver.get(
      "https://www.google.com/search?q=mh+world&oq=mh+world&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDIzMDVqMGo3qAIAsAIA&client=ubuntu-chr&sourceid=chrome&ie=UTF-8",
    );
    console.log(await driver.getTitle());
    await driver.quit();
  } catch (e) {
    console.log(e);
  }
}
