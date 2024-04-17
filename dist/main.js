"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./services/scraper");
const scraper_1 = __importDefault(require("./services/scraper"));
const api_routes = require("./routes/index");
const express = require("express");
const app = express();
const port = 3001;
app.use("/api/v1", api_routes);
app.listen(port, async () => {
    await (0, scraper_1.default)();
    console.log("Web scraping service");
});
app.get("/", (req, res) => {
    res.json({ Message: "Hello and welcome" });
});
