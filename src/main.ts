import { Express, Request, Response } from "express";
import web_scraper from "./utils/chrome_driver";
import { WebDriver } from "selenium-webdriver";
const api_routes = require("./routes/index");
const express = require("express");
const app: Express = express();
const port = 3002;

app.use(express.urlencoded());
app.use(express.json());
app.use("/api/v1", api_routes);
app.listen(port, async () => {
  console.log("Web scraping service");
});

app.get("/", async (req: Request, res: Response) => {
  res.json({ Message: "Hello and welcome" });
});
