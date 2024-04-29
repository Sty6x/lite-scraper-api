import { Response, Request, NextFunction } from "express";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const session_store = req.sessionStore;
  session_store.get(req.cookies.sess_id, (err, session) => {
    console.log({ sess_id: req.cookies.sess_id, session });
    if (session !== null) {
      res.send({ session_id: req.cookies.sess_id });
      return;
    } else {
      console.log("Session does not exist");
      next();
    }
  });
}

export async function create_client_session(req: Request, res: Response) {
  console.log("create client");
  const session_store = req.sessionStore;
  session_store.set(req.session.id, req.session, (err) => {
    res.cookie("sess_id", req.session.id);
    res.send({ session_id: "CREATED" });
  });
}
