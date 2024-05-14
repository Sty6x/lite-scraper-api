import { Express, Request, Response } from "express";
import * as https from "https";
import { auth, create_client_session } from "./middlewares/auth";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";

const cookieParser = require("cookie-parser");
const api_routes = require("./routes/index");
const express = require("express");
const cors = require("cors");
const app: Express = express();
const fs = require("fs");
const PORT = process.env.PORT || 3005;
const chrome_extension_origin =
  "chrome-extension://lccoddheifnemjdpojidcfifeiplpboi";

const cors_options = {
  origin: chrome_extension_origin,
  methods: ["GET", "POST"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.set("trust proxy", 1);
app.use(cors(cors_options));
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
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000000,
    },
  }),
);
const http_options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(http_options, app).listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
app.get("/", auth, create_client_session);
app.use("/api/v1/scraper", api_routes);
