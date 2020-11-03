import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { auth } from "express-openid-connect";
import * as routes from "./routes";

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.HOST_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(cors({ origin: "http://localhost:3000", methods: "GET" }));
app.use(auth(config));
routes.register(app);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
