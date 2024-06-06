"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperInterface = void 0;
const playwright_1 = require("playwright");
const scraper_1 = require("./scraper");
class ScraperInterface extends scraper_1.Scraper {
    chrome;
    constructor(task) {
        super(task);
        this.chrome = playwright_1.chromium;
    }
    async initialize_scraper() {
        const user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
        this.browser = await this.chrome.launch();
        this.page = await this.browser.newPage({ userAgent: user_agent });
        await this.page.goto(this.task.websiteURL);
    }
    async single_page() {
        try {
            const scraped_data = await this.scrape();
            const new_task = {
                ...this.task,
                data: scraped_data,
            };
            this.browser?.close();
            return new_task;
        }
        catch (e) {
            console.log(e);
            return { ...this.task, data: [] };
        }
    }
    async multi_page() {
        try {
            if (!this.task.multipageConfig)
                throw Error;
            const { end_page, starting_page } = this.task.multipageConfig;
            const pages = [];
            let end = end_page;
            let page_count = starting_page;
            while (page_count < end + 1) {
                const scraped_data = await this.scrape();
                pages.push({ page: page_count, pageData: scraped_data });
                page_count++;
                await this.page?.goto("https://www.amazon.ae/s?k=phones&page=2&ref=sr_pg_2");
            }
            this.browser?.close();
            return { ...this.task, data: pages };
        }
        catch (e) {
            console.log(e);
            this.browser?.close();
            return { ...this.task, data: [] };
        }
    }
}
exports.ScraperInterface = ScraperInterface;
