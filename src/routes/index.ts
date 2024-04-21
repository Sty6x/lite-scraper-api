import express, { Response, Request } from "express";
import { parser } from "../middlewares/parser";
import { Scraper } from "../services/scraper";
import chromeDriver from "../utils/custom_web_driver";

const router = express.Router();
router.post("/scrape", parser, (req: Request, res: Response) => {
  const scraper = new Scraper(chromeDriver);
  scraper.scrape(req.body.parsedData);
  console.log(req.body.parsedData);
  res.json(req.body.parsedData);
});

module.exports = router;
