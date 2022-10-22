import express from "express";
import {
  renderSignin,
  login,
  logout,
} from "../controllers/signinController.js";

export const signinRouter = express.Router();

signinRouter.route("/signin").get(renderSignin);
signinRouter.route("/login").post(login);
signinRouter.route("/logout").delete(logout);
