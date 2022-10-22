import express from "express";
import { authenticateRoute } from "../auth/auth.js";
import { renderProfile } from "../controllers/profileController.js";

export const profileRouter = express.Router();

profileRouter.route("/profile").get(authenticateRoute, renderProfile);
