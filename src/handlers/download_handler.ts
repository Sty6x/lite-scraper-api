import { Request, Response } from "express";
export default async (req: Request, res: Response) => {
  const current_task = req.session.tasks?.find(
    (task) => task.taskID === req.params.taskID,
  );
  const convert_json = JSON.stringify(current_task);
  if (current_task === undefined) {
    res.json({
      Message:
        "Unable to download because the task does not exist in this current session.",
      taskID_lookup: req.params.taskID,
      is_downloadable: false,
    });
    return;
  }
  res.json({
    Message: "Success",
    task_data: convert_json,
    is_downloadable: true,
  });
};
