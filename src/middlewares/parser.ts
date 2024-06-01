import { Request, Response, NextFunction } from "express";
import { t_task } from "../types/project_types";

export default async function parser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.body);
  const incoming_task: t_task = {
    sessID: req.sessionID,
    ...req.body,
    taskSchema: req.body.taskSchema,
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
