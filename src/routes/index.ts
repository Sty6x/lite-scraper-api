import express, { Response, Request } from "express";
import parser from "../middlewares/parser";
import { rate_limiting } from "../middlewares/rate_limit";
import download_handler from "../handlers/download_handler";
import scrape_handler from "../handlers/scrape_handler";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ Message: "Welcome to lite scraper." });
});
router.post("/scrape", rate_limiting, parser, scrape_handler);

router.get("/download/:taskID", download_handler);
module.exports = router;
