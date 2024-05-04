import { Request, Response, NextFunction } from "express";
import { t_task } from "../types/project_types";
import { uid } from "uid";

async function parser(req: Request, res: Response, next: NextFunction) {
  const incoming_task: t_task = {
    sessID: req.sessionID,
    taskID: uid(16),
    ...req.body,
    taskSchema: JSON.parse(req.body.taskSchema),
    data: [],
  };
  if (incoming_task.multipageConfig === undefined) {
    req.body.parsedData = { ...incoming_task };
    next();
    return;
  }
  req.body.parsedData = {
    ...incoming_task,
    multipageConfig: JSON.parse(req.body.multipageConfig),
  };
  next();
}

export { parser };
