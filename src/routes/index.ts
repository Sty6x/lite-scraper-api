import express, { Response, Request } from "express";

const router = express.Router();

router.get("/scrape", (req: Request, res: Response) => {
  res.json({ message: "scraped" });
});

module.exports = router;
