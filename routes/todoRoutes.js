import express from "express";
import { authenticateRoute } from "../auth/auth.js";
import { addTodo, deleteTodo, removeTodo } from "../controllers/addTodoController.js";

export const todoRouter = express.Router();

todoRouter.route("/add").post(authenticateRoute, addTodo);
todoRouter.route("/delete/:todo/:title").delete(authenticateRoute, deleteTodo);
todoRouter.route("/remove/:todo/:title").delete(authenticateRoute, removeTodo);
