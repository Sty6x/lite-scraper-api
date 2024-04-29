import { Response, Request, NextFunction } from "express";
import { SessionData } from "express-session";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const session_store = req.sessionStore;
  let eval_existing_user: SessionData | undefined = undefined;
  session_store.get(req.cookies.sess_id, (err, session) => {
    eval_existing_user = session === null ? undefined : session;
    console.log(err);
  });
  if (eval_existing_user === undefined) {
    console.log("Session does not exist");
    next();
  } else {
    res.send({ session_id: req.cookies.sess_id });
  }
}

export async function create_client_session(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session_store = req.sessionStore;
  session_store.set(req.session.id, req.session, (err) => {
    console.log(err);
    res.send({ Message: "There was a problem creating your session." });
  });
  res.cookie("sess_id", req.session.id);
  res.send({ session_id: req.session.id });
}
