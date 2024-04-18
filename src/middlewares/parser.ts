import { Request, Response, NextFunction } from "express";
import { user_query } from "../types/user_query";

async function parser(req: Request, res: Response, next: NextFunction) {
  const parseDataSchema: user_query = {
    ...req.body,
    dataQuery: JSON.parse(req.body.dataQuery),
  };
  req.body.parsedData = { ...parseDataSchema };
  next();
}

export { parser };
