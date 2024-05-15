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
        res.send({
          session_id: req.session.id,
          message: "Session Exists",
          can_sign_in: true,
          ...req.session,
        });
        return;
      }
      next();
    },
  );
}

export async function create_client_session(req: Request, res: Response) {
  try {
    console.log("Successfully created a new session");
    req.session.date_created = new Date().toDateString();
    req.session.tasks = [];
    res.send({
      session_id: req.sessionID,
      message: "New Session Created",
      can_sign_in: true,
      ...req.session,
    });
  } catch (e) {
    res.send({ message: "Something went wrong" });
  }
}
