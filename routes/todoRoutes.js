import express from "express";
import { authenticateRoute } from "../auth/auth.js";
import { addTodo } from "../controllers/addTodoController.js";

export const todoRouter = express.Router();

todoRouter.route("/add").post(authenticateRoute, addTodo);
