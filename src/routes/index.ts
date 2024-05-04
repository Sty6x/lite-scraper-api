import express, { Response, Request } from "express";
import { parser } from "../middlewares/parser";
import { t_task } from "../types/project_types";
import { ScraperInterface } from "../services/scraper_interface";

const router = express.Router();

router.post("/", parser, async (req: Request, res: Response) => {
  const sess_store = req.sessionStore;
  const new_task: t_task = req.body.parsedData;
  console.log(new_task);
  try {
    const scraper = new ScraperInterface(new_task);
    await scraper.initialize_scraper();
    const scraped_data = await scraper.single_page();
    res.send({ ...scraped_data });
  } catch (e) {
    console.error(e);
  }
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
