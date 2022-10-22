import { Todos } from "../models/todoModel.js";

export const renderProfile = (req, res) => {
  const user = req.user;
  Todos.find({ Author: user._id })
    .then((todos) => {
      return res.render("profile", {
        todos: todos,
        name: user.Username,
        success: "Welcome to your dashboard",
      });
    })
    .catch((err) => {
      console.log(`There is an error fetching your data: ${err}`);
    });
};
