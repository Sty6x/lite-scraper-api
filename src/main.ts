import { Express, Request, Response } from "express";
import web_scraper from "./services/scraper";
import { WebDriver } from "selenium-webdriver";
const api_routes = require("./routes/index");
const express = require("express");
const app: Express = express();
const port = 3001;

app.use("/api/v1", api_routes);
app.listen(port, async () => {
  const web_driver: WebDriver | null = await web_scraper.webDriver;
  console.log("Web scraping service");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ Message: "Hello and welcome" });
});
