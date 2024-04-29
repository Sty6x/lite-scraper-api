import express, { Response, Request } from "express";
import { parser } from "../middlewares/parser";
import { ScraperInterface } from "../services/scraper_interface";
import { writeFile, readFile } from "fs/promises";

const router = express.Router();

router.post("/", parser, async (req: Request, res: Response) => {
  const scraper = new ScraperInterface(req.body.parsedData);
  await scraper.initialize_scraper();
  const scraped_data = await scraper.multi_page();
  const toJSONdata = JSON.stringify({});
  const parsedData = await writeFile("./users.json", toJSONdata, "utf-8");
  res.send({ queried: {} });
});

router.get("/download", async (req: Request, res: Response) => {
  res.download("./user_query.json", (err) => {
    if (err) {
      console.log("err");
      throw err;
    } else {
      console.log("file recieved");
    }
  });
});
module.exports = router;
