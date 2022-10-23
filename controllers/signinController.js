import passport from "passport";
import { Todos } from "../models/todoModel.js";
import { FinishedTodos } from "../models/finishedTodosModel.js";

export const renderSignin = async (req, res) => {
  const user = req.user;
  if (user) {
    const todos = await Todos.find({ Author: user._id });
    const doneTodos = await FinishedTodos.find({ Author: user._id });
    return res.render("profile", {
      todos: todos,
      finishedTodos: doneTodos,
      name: user.Username,
      success: "You are already signed in.",
    });
  }
  if (!user) {
    return res.render("signin");
  }
};

//This functionality handles the logging in of users, authenticates them with passport and handles the response to send a jwt to the http header
export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render("signin", {
        err: info.message,
      });
    }
    if (user) {
      req.logIn(user, async (err) => {
        if (err) return next(err);
        const todos = await Todos.find({ Author: user._id });
        const doneTodos = await FinishedTodos.find({ Author: user._id });
        return res.render("profile", {
          todos: todos,
          finishedTodos: doneTodos,
          name: user.Username,
          success: "You are now signed in",
        });
      });
    }
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) next(err);
    res.redirect("/");
  });
};
