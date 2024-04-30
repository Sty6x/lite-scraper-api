import { Express, Request, Response } from "express";
import { auth, create_client_session } from "./middlewares/auth";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";

const cookieParser = require("cookie-parser");
const api_routes = require;
const express = require("express");
const app: Express = express();
const port = 3005;

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000,
    },
  }),
);

app.listen(port, async () => {
  console.log("Web scraping service");
});

app.get("/", auth, create_client_session);

app.use("/api/v1/scrape", api_routes);
