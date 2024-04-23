import express, { Response, Request } from "express";
import { parser } from "../middlewares/parser";
import { Scraper } from "../services/scraper";
import { ScraperInterface } from "../services/scraper_interface";

const router = express.Router();
router.post("/scrape", parser, async (req: Request, res: Response) => {
  const scraper = new ScraperInterface(req.body.parsedData);
  await scraper.initialize_scraper();
  const scraped_data = await scraper.scrape();
  console.log(scraped_data);
  res.json(req.body.parsedData);
});

module.exports = router;
