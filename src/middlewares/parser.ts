import { Request, Response, NextFunction } from "express";
import { user_query } from "../types/user_query";

async function parser(req: Request, res: Response, next: NextFunction) {
  const req_body: user_query = { ...req.body };
  console.log(req_body.dataQuery);
  const parseDataSchema: user_query = {
    ...req.body,
    dataQuery: JSON.parse(req.body.dataQuery),
  };
  if (req_body.multipageQuery === undefined) {
    req.body.parsedData = { ...parseDataSchema };
    next();
    return;
  }
  req.body.parsedData = {
    ...parseDataSchema,
    multipageQuery: JSON.parse(req.body.multipageQuery),
  };
  next();
}

export { parser };
