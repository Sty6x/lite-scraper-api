"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_client_session = exports.auth = void 0;
async function auth(req, res, next) {
    const session_store = req.sessionStore;
    session_store.get(req.session.id, (err, session) => {
        if (session !== null) {
            res.send({
                session_id: req.session.id,
                message: "Session Exists",
                can_sign_in: true,
                ...req.session,
            });
            return;
        }
        next();
    });
}
exports.auth = auth;
async function create_client_session(req, res) {
    try {
        console.log("Successfully created a new session");
        req.session.date_created = new Date().toDateString();
        req.session.tasks = [];
        res.send({
            session_id: req.sessionID,
            message: "New Session Created",
            can_sign_in: true,
            ...req.session,
        });
    }
    catch (e) {
        res.send({ message: "Something went wrong" });
    }
}
exports.create_client_session = create_client_session;
