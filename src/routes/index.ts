import express, { Response, Request } from "express";
import { parser } from "../middlewares/parser";
import { ScraperInterface } from "../services/scraper_interface";
import { writeFile, readFile } from "fs/promises";

const router = express.Router();

router.post("/", parser, async (req: Request, res: Response) => {
  // const sess_store = req.sessionStore;
  console.log("LOGGED");

  const new_task = req.body.parsedData;
  // const scraper = new ScraperInterface(new_task);
  // await scraper.initialize_scraper();
  // const scraped_data = await scraper.single_page();
  // sess_store.get(req.sessionID, async (err, sess_data) => {
  //   if (sess_data !== undefined || sess_data !== null) {
  //     await writeFile("./users.json", JSON.stringify(sess_data), "utf-8");
  //     res.send({ Message: "Scrape successful." });
  //     return;
  //   }
  res.send({ Message: "Data does not exist." });
  // });
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
