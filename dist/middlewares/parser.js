"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function parser(req, res, next) {
    const incoming_task = {
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
exports.default = parser;
