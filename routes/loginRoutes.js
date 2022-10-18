import express from "express";
import { 
    renderLogin,
} from "../controllers/login.js";

export const loginRouter = express.Router();

//loginRouter will handle all backend logic for creating, deleting, logging in and logging out users
loginRouter.route("/").get(renderLogin);
