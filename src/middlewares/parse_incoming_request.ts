import { Request, Response, NextFunction } from "express";

async function parser(req: Request, res: Response, next: NextFunction) {
  // const parseJSONBody = JSON.parse(req.body);
  console.log(req.body);
  next();
}

export { parser };
