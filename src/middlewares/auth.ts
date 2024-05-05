import { Response, Request, NextFunction } from "express";
import { SessionData } from "express-session";
import { t_task } from "../types/project_types";

declare module "express-session" {
  interface SessionData {
    date_created: string;
    tasks: Array<t_task>;
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const session_store = req.sessionStore;
  session_store.get(
    req.session.id,
    (err: any, session: SessionData | null | undefined) => {
      if (session !== null) {
        console.log(req.session);
        console.log(req.cookies);
        res.send({ session_id: req.session.id });
        return;
      }
      next();
    },
  );
}

export async function create_client_session(req: Request, res: Response) {
  req.session.date_created = new Date().toDateString();
  req.session.tasks = [];
  console.log(req.cookies);
  res.send({ session_id: "CREATED" });
}
