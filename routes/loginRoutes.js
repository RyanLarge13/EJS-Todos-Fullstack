import express from "express";
import { renderLogin, loginRegister, logout } from "../controllers/login.js";

export const loginRouter = express.Router();

//loginRouter will handle all backend logic for creating, deleting, logging in and logging out users
loginRouter.route("/login").get(renderLogin).post(loginRegister);
loginRouter.route("/logout").delete(logout);
