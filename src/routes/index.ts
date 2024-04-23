import express, { Response, Request } from "express";
import { parser } from "../middlewares/parser";
import { Scraper } from "../services/scraper";

const router = express.Router();
router.post("/scrape", parser, async (req: Request, res: Response) => {
  const scraper = new Scraper(req.body.parsedData);
  const scraped_data = await scraper.multi_page();
  console.log(scraped_data);
  res.json(req.body.parsedData);
});

module.exports = router;
