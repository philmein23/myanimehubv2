"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
exports.register = (app) => {
    const oidc = app.locals.oidc;
    // define a route handler for the default home page
    app.get("/", (req, res) => {
        // tslint:disable-next-line:no-console
        var _a;
        console.log(`REQ: ${(_a = req.userContext) === null || _a === void 0 ? void 0 : _a.userInfo}`);
        res.json({ success: true });
    });
    app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
        res.redirect("/anime");
    });
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    app.get("/anime", oidc.ensureAuthenticated(), (req, res) => {
        // tslint:disable-next-line:no-console
        const user = req.userContext ? req.userContext.userInfo : null;
        // console.log(`REQUEST: ${req.userContext}`);
        console.log(`USER: ${user}`);
        res.json({ animePage: "Welcome to My Anime Hub", success: true });
    });
};
//# sourceMappingURL=index.js.map