import express, { Response, Request } from "express";
import { parser } from "../middlewares/parser";
import { t_task } from "../types/project_types";
import { ScraperInterface as Scraper } from "../services/scraper_interface";

const router = express.Router();

router.post("/", parser, async (req: Request, res: Response) => {
  const session = req.session;
  const sess_store = req.sessionStore;
  const parsed_task: t_task = req.body.parsedData;
  try {
    const scraper = new Scraper(parsed_task);
    await scraper.initialize_scraper();
    const new_task = await scraper.single_page();
    if (req.cookies["connect.sid"] === undefined) {
      res.send({ Message: "Session Does not exist." });
    }
    sess_store.get(session.id, (err, session_data) => {
      if (err) res.send({ Message: err });
      if (session_data === null || session_data === undefined) {
        res.send({ Message: "Session Expired" });
      }
      const update_tasks = [
        new_task,
        ...(session_data?.tasks as Array<t_task>),
      ];
      session.tasks = update_tasks;
      res.send(session_data);
    });
  } catch (e) {
    console.error(e);
    res.send({ Message: "Something went wrong with your request." });
  }
});

router.get("/download/:taskID", async (req: Request, res: Response) => {
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
