"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
async function driverInializer() {
    let driver = await new selenium_webdriver_1.Builder().forBrowser(selenium_webdriver_1.Browser.CHROME).build();
    await driver.get("https://selenium.dev");
    console.log(await driver.getTitle());
}
exports.default = driverInializer;
