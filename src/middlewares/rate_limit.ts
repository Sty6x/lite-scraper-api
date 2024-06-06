import { Request, Response, NextFunction } from "express";

const IP_blocklist = new Map();
const IP_whitelist = new Map();
const LIMIT = 1;
const RESET_TIMER = 10;

type t_white_listed_user = {
  ip: string;
  limit: number;
  calls: number;
};

type t_block_listed_user = {
  ip: string;
  reset_timer: string | Date;
};

function is_timeout_expired(reset_timer: string | Date): boolean {
  const current_time = new Date();

  console.log({ current_time, reset_timer });
  return current_time > reset_timer ? true : false;
}

export async function ip_rate_limiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.cookies["connect.sid"] === undefined) {
    res.json({
      is_downloadable: false,
      Message: "Session has expired please restart the extension.",
      session_expired: true,
    });
    return;
  }
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (IP_blocklist.has(ip)) {
    const current_user_ip: t_block_listed_user = IP_blocklist.get(ip);
    if (is_timeout_expired(current_user_ip.reset_timer)) {
      IP_blocklist.delete(ip);
      IP_whitelist.set(ip, { ip, limit: LIMIT, calls: 1 });
      console.log({ m: "Reset expired", ip: IP_whitelist.get(ip) });
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

  if (!IP_whitelist.has(ip)) {
    IP_whitelist.set(ip, { ip, limit: LIMIT, calls: 1 });
    console.log({ m: "not expired", ip: IP_whitelist.get(ip) });
    next();
    return;
  }
  const current_user_ip: t_white_listed_user = IP_whitelist.get(ip);
  if (current_user_ip.calls >= current_user_ip.limit) {
    const reset_timer = new Date();
    reset_timer.setSeconds(new Date().getSeconds() + RESET_TIMER);
    IP_blocklist.set(ip, { ip, reset_timer });
    console.log({ m: "Call limit exceeded", ip: IP_blocklist.get(ip) });
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
    console.log({ m: "Callable", ip: IP_whitelist.get(ip) });
    next();
  }
}
