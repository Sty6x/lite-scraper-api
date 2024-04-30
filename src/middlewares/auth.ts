import { Response, Request, NextFunction } from "express";
import { SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    date_created?: string;
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const session_store = req.sessionStore;
  session_store.get(
    req.session.id,
    (err: any, session: SessionData | null | undefined) => {
      if (session !== null) {
        console.log(req.session.id);
        res.send({ session_id: req.session.id });
        return;
      }
      next();
    },
  );
}

export async function create_client_session(req: Request, res: Response) {
  req.session.date_created = new Date().toDateString();
  console.log({ sess_id: req.session.id, session: req.session });
  res.send({ session_id: "CREATED" });
}
