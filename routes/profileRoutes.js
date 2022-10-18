import express from "express";
import {
    renderProfile,
} from "../controllers/profile.js";

export const profileRouter = express.Router();

//profileRouter will handle all backend logic for handling the display, manipulation, creation, and deleting a user's todos.
profileRouter.route("/profile").get(renderProfile);