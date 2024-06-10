import express, { Express, Request, Response, Application } from "express";
import * as https from "https";
import { auth, create_client_session } from "./middlewares/auth";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import helmet from "helmet";

const morgan = require("morgan");
const app: Application = express();
const cookieParser = require("cookie-parser");
const api_routes = require("./routes/index");
const cors = require("cors");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const chrome_extension_origin =
  "chrome-extension://pmnpcehiaohjmiklhlfnehlllnooijao";

const cors_options = {
  origin: chrome_extension_origin,
  methods: ["GET", "POST"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(helmet());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);
app.set("trust proxy", true);
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
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
const http_options: https.ServerOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(http_options, app).listen({ port: PORT, host: HOST }, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
app.get("/", auth, create_client_session);
app.use("/api/v1/scraper", api_routes);
