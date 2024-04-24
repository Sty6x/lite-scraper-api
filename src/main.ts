import { Express, Request, Response } from "express";
const api_routes = require("./routes/index");
const express = require("express");
const app: Express = express();
const port = 3005;

app.use(express.urlencoded());
app.use(express.json());

app.listen(port, async () => {
  console.log("Web scraping service");
});

app.use("/api/v1/scrape", api_routes);
app.get("/", async (req: Request, res: Response) => {
  res.json({ Message: "Hello and welcome" });
});
