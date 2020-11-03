import * as express from "express";
import { requiresAuth } from "express-openid-connect";

export const register = (app: express.Application) => {
  // define a route handler for the default home page
  app.get("/", (req: any, res) => {
    res.json(
      req.oidc.isAuthenticated() ? { success: true } : { success: false }
    );
  });

  app.get("/profile", requiresAuth(), (req: any, res) => {
    res.json(req.oidc.user);
  });
};
