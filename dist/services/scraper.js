"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = void 0;
class Scraper {
    task;
    page;
    browser;
    constructor(new_task) {
        this.task = new_task;
        this.page = null;
        this.browser = null;
    }
    async scrape() {
        try {
            const raw_data = await this.get_raw_data();
            const populated_query = await this.get_data(raw_data);
            return populated_query;
        }
        catch (e) {
            console.error("Something went wrong.");
            console.error(e);
            await this.browser?.close();
            return [];
        }
    }
    async get_raw_data() {
        const task_schema_values = Object.values(this.task.taskSchema);
        const map_schema = task_schema_values.map(async (value) => {
            try {
                if (!this.page)
                    throw "Page does not exist.";
                const located_items = await this.page.locator(value).all();
                return located_items;
            }
            catch (e) {
                console.error(e);
            }
        });
        const raw_data = await Promise.all(map_schema);
        return raw_data;
    }
    async get_data(raw_data) {
        const task_keys = Object.keys(this.task.taskSchema);
        const populate_query = raw_data[0].map(async (_, i) => {
            let populated_query = {};
            for (let j = 0; j < task_keys.length; j++) {
                const query_item = raw_data[j][i];
                if (query_item === undefined)
                    break;
                const data = await query_item.textContent();
                populated_query[task_keys[j]] = data?.trim();
            }
            return populated_query;
        });
        const resolve_text_data = await Promise.all(populate_query);
        return resolve_text_data;
    }
}
exports.Scraper = Scraper;
