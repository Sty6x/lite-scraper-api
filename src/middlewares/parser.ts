import { Request, Response, NextFunction } from "express";
import { t_task } from "../types/project_types";

async function parser(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  const incoming_task: t_task = {
    id: "New id",
    ...req.body,
    taskSchema: JSON.parse(req.body.taskSchema),
    data: [],
  };
  console.log(incoming_task);
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
