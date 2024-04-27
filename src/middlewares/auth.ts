import { Response, Request, NextFunction } from "express";
import User_Store from "../utils/user_database";
import { readFile, writeFile } from "fs/promises";
type t_user_database = {
  users: Array<{
    name: string;
    session_id: string;
    cookie: { [key: string]: any };
  }>;
};

async function auth(req: Request, res: Response, next: NextFunction) {
  console.log(req.sessionStore);
  const users_data = await readFile("./users.json", "utf8");
  const users_database: t_user_database = JSON.parse(users_data);
  const user_session_id = req.headers.cookie;
  const user_name = req.body.name;
  const eval_existing_user_credentials = users_database.users.find(
    (user) => user.name === user_name,
  );

  if (eval_existing_user_credentials === undefined) {
    res.send(`Create an account before you can access this site.`);
  } else {
    const eval_existing_user_id = users_database.users.find(
      (user) => user.session_id === user_session_id,
    );
    const timed_out = undefined;
    if (
      req.headers.cookie === undefined || // if user exists but cookie is empty or there is not cookie session id
      eval_existing_user_id === timed_out // if user exists but session id is expired create new session id
    ) {
      const existing_user = eval_existing_user_credentials;
      const new_session_id = req.session.id;
      const update_database = {
        users: [
          ...users_database.users,
          { ...existing_user, session_id: new_session_id },
        ],
      };
      await writeFile("./users.json", JSON.stringify(update_database));
      console.log(users_database);
      res.send(`Welcome Back ${existing_user.name}`);
    } else {
      res.send(
        `Welcome back ${eval_existing_user_credentials.name}\n
       Your session id is: ${eval_existing_user_credentials.session_id}`,
      );
    }
  }
}
export { auth };
