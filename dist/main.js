"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./middlewares/auth");
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("dotenv/config");
const helmet_1 = __importDefault(require("helmet"));
const morgan = require("morgan");
const app = (0, express_1.default)();
const cookieParser = require("cookie-parser");
const api_routes = require("./routes/index");
const cors = require("cors");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const chrome_extension_origin = "chrome-extension://pmnpcehiaohjmiklhlfnehlllnooijao";
const cors_options = {
    origin: chrome_extension_origin,
    methods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use((0, helmet_1.default)());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.set("trust proxy", true);
app.use(cors(cors_options));
app.use(cookieParser());
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.DB_URI,
        collectionName: "sessions",
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
// const http_options: https.ServerOptions = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };
// https.createServer(http_options, app).listen({ port: PORT, host: HOST }, () => {
//   console.log(`Server running on https://localhost:${PORT}`);
// });
//
app.listen({ port: PORT, host: HOST }, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
app.get("/", auth_1.auth, auth_1.create_client_session);
app.use("/api/v1/scraper", api_routes);
