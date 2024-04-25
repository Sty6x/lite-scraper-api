import { Express, Request, Response } from "express";
import { auth } from "./middlewares/auth";
import session from "express-session";
const api_routes = require("./routes/index");
const express = require("express");
const app: Express = express();
const port = 3005;

app.use(express.urlencoded());
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

app.listen(port, async () => {
  console.log("Web scraping service");
});

app.get("/", auth);
app.use("/api/v1/scrape", api_routes);
