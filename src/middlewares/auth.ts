import { Response, Request, NextFunction } from "express";
import User_Store from "../utils/user_database";
import { readFile } from "fs/promises";
type t_user_database = {
  user_session_ids: Array<string>;
  users: Array<{ name: string; id: string }>;
};

async function auth(req: Request, res: Response, next: NextFunction) {
  const users_data = await readFile("./users.json", "utf8");
  const users: t_user_database = JSON.parse(users_data);
  const user_session_id = req.headers.cookie;
  const user_name = req.body.name;
  if (users.user_session_ids.find((id) => id === user_session_id)) {
    console.log(users.users.find((user) => user.id === user_session_id));
  } else {
    User_Store.user_store.set(req.session.id, { name: user_name });
    console.log("doesnt exist");
  }
  res.end();
}
export { auth };
