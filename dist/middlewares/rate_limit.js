"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ip_rate_limiter = void 0;
const IP_blocklist = new Map();
const IP_whitelist = new Map();
<<<<<<< HEAD
const LIMIT = 1;
const RESET_TIMER = 10;
=======
const LIMIT = 100;
const RESET_TIMER = 24 * 60 * 60 * 1000;
>>>>>>> 1392110f1c0dee191d5d16a6c2606d2b79e9db6f
function is_timeout_expired(reset_timer) {
    const current_time = new Date();
    console.log({ current_time, reset_timer });
    return current_time > reset_timer ? true : false;
}
async function ip_rate_limiter(req, res, next) {
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
        const current_user_ip = IP_blocklist.get(ip);
        if (is_timeout_expired(current_user_ip.reset_timer)) {
            IP_blocklist.delete(ip);
            IP_whitelist.set(ip, { ip, limit: LIMIT, calls: 1 });
<<<<<<< HEAD
            console.log({ m: "Reset expired", ip: IP_whitelist.get(ip) });
=======
            console.log({ log_message: "Reset expired", ip: IP_whitelist.get(ip) });
>>>>>>> 1392110f1c0dee191d5d16a6c2606d2b79e9db6f
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
<<<<<<< HEAD
        console.log({ m: "not expired", ip: IP_whitelist.get(ip) });
=======
        console.log({ log_message: "not expired", ip: IP_whitelist.get(ip) });
>>>>>>> 1392110f1c0dee191d5d16a6c2606d2b79e9db6f
        next();
        return;
    }
    const current_user_ip = IP_whitelist.get(ip);
    if (current_user_ip.calls >= current_user_ip.limit) {
        const reset_timer = new Date();
        reset_timer.setSeconds(new Date().getSeconds() + RESET_TIMER);
        IP_blocklist.set(ip, { ip, reset_timer });
<<<<<<< HEAD
        console.log({ m: "Call limit exceeded", ip: IP_blocklist.get(ip) });
=======
        console.log({
            log_message: "Call limit exceeded",
            ip: IP_blocklist.get(ip),
        });
>>>>>>> 1392110f1c0dee191d5d16a6c2606d2b79e9db6f
        res.json({
            Message: "Call limit exceeded",
            is_downloadable: false,
            taskID: req.body.parsedData.taskID,
        });
    }
    else {
        IP_whitelist.set(ip, {
            ...current_user_ip,
            calls: current_user_ip.calls + 1,
        });
<<<<<<< HEAD
        console.log({ m: "Callable", ip: IP_whitelist.get(ip) });
=======
        console.log({ log_message: "Callable", ip: IP_whitelist.get(ip) });
>>>>>>> 1392110f1c0dee191d5d16a6c2606d2b79e9db6f
        next();
    }
}
exports.ip_rate_limiter = ip_rate_limiter;
