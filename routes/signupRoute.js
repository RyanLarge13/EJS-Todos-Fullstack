import express from "express";
import { renderSignup, registerUser} from "../controllers/signupController.js";

export const signupRouter = express.Router();

signupRouter.route("/signup").get(renderSignup).post(registerUser)
