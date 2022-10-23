import { Todos } from "../models/todoModel.js";
import { FinishedTodos } from "../models/finishedTodosModel.js";

export const renderProfile = async (req, res) => {
  const user = req.user;
  const todos = await Todos.find({ Author: user._id });
  const doneTodos = await FinishedTodos.find({ Author: user._id });
  return res.render("profile", {
    todos: todos,
    finishedTodos: doneTodos,
    name: user.Username,
    success: "Welcome to your dashboard",
  });
};
