import { Express, Request, Response } from "express";
import { auth } from "./middlewares/auth";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";

const api_routes = require;
const express = require("express");
const app: Express = express();
const port = 3005;

app.use(express.urlencoded());
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 10000 },
  }),
);

app.listen(port, async () => {
  console.log("Web scraping service");
});

app.get("/", auth);
app.use("/api/v1/scrape", api_routes);
