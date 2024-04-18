import express, { Response, Request } from "express";
import { parser } from "../middlewares/parse_incoming_request";

const router = express.Router();
router.post("/scrape", parser, (req: Request, res: Response) => {
  res.json({ message: "scraped" });
});

module.exports = router;
