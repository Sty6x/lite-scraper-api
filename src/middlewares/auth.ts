import { Response, Request, NextFunction } from "express";
import { readFile } from "fs/promises";
async function auth(req: Request, res: Response, next: NextFunction) {
  const read_users = await readFile("./users.json", "utf8");
  const to_obj = JSON.parse(read_users);
  console.log(to_obj);
  res.send(to_obj);
}
export { auth };
