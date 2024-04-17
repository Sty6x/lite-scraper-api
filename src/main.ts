import { Express, Request, Response } from "express";
const api_routes = require("./routes/index");
const express = require("express");
const app: Express = express();
const port = 3000;

app.listen(port, () => {
  console.log("Web scraping service");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ Message: "Hello and welcome" });
});

app.use("/api/v1", api_routes);
