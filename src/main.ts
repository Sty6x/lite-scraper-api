import { Express, Request, Response } from "express";
import "./services/scraper";
import driverInializer from "./services/scraper";
const api_routes = require("./routes/index");
const express = require("express");
const app: Express = express();
const port = 3001;

app.use("/api/v1", api_routes);
app.listen(port, async () => {
  await driverInializer();
  console.log("Web scraping service");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ Message: "Hello and welcome" });
});
