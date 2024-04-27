import { Express, Request, Response } from "express";
import { auth } from "./middlewares/auth";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const api_routes = require;
const express = require("express");
const app: Express = express();
const port = 3005;
const redis_client = createClient();

app.use(express.urlencoded());
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    store: new RedisStore({ client: redis_client, prefix: "localhost" }),
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
