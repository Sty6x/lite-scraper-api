"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parser_1 = __importDefault(require("../middlewares/parser"));
const rate_limit_1 = require("../middlewares/rate_limit");
const download_handler_1 = __importDefault(require("../handlers/download_handler"));
const scrape_handler_1 = __importDefault(require("../handlers/scrape_handler"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ Message: "Welcome to lite scraper." });
});
router.post("/scrape", parser_1.default, rate_limit_1.ip_rate_limiter, scrape_handler_1.default);
router.get("/download/:taskID", download_handler_1.default);
module.exports = router;
