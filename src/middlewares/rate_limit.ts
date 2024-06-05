import { Request, Response, NextFunction } from "express";

const IP_blocklist = new Map();
const IP_whitelist = new Map();
const LIMIT = 2;

type t_white_listed_user = {
  ip: string;
  limit: number;
  calls: number;
};

type t_block_listed_user = {
  ip: string;
  reset_timer: string | Date;
};

function is_timeout_expired(time: string | Date): boolean {
  console.log(time);
  return true;
}

export async function rate_limiting(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (IP_blocklist.has(ip)) {
    const current_user_ip: t_block_listed_user = IP_blocklist.get(ip);
    if (is_timeout_expired(current_user_ip.reset_timer)) {
      // need to process the reset timer, create a function that takes in a date and
      // check if it is more than x hours and return a boolean
      IP_blocklist.delete(ip);
      IP_whitelist.set(ip, { ip, limit: LIMIT, calls: 1 });
      next();
      return;
    }
    console.log({ m: "Ip is blocked", ip: IP_blocklist.get(ip) });
    res.json({
      Message: "Ip is blocked and will reset at xxx time",
      is_downloadable: false,
      taskID: req.body.parsedData.taskID,
    });
    return;
  }

  // if the user is new
  // set new ip
  if (!IP_whitelist.has(ip)) {
    IP_whitelist.set(ip, { ip, limit: LIMIT, calls: 1 });
    console.log({ m: "not expired", ip: IP_whitelist.get(ip) });
    next();
    return;
  }
  const current_user_ip: t_white_listed_user = IP_whitelist.get(ip);
  if (current_user_ip.calls >= current_user_ip.limit) {
    IP_blocklist.set(ip, { ip, reset_timer: new Date() });
    console.log({ m: "Call expired", ip: IP_blocklist.get(ip) });
    res.json({
      Message: "Call limit exceeded",
      is_downloadable: false,
      taskID: req.body.parsedData.taskID,
    });
  } else {
    IP_whitelist.set(ip, {
      ...current_user_ip,
      calls: current_user_ip.calls + 1,
    });
    console.log({ m: "Increment", ip: IP_whitelist.get(ip) });
    next();
  }
}
