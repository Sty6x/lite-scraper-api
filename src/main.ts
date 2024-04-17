import { Express, Request, Response } from "express";

const express = require("express");
const app: Express = express();
const port = 3000;

app.get("/nice", (req: Request, res: Response) => {
  res.json({ Message: "ello and welcome" });
});

app.listen(port, () => {
  console.log("Web scraping service");
});
