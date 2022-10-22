import passport from "passport";
import { Todos } from "../models/todoModel.js";

export const renderSignin = (req, res) => {
  const user = req.user;
  if (user) {
    Todos.find({ Author: user._id })
      .then((todos) => {
        return res.render("profile", {
          todos: todos,
          name: user.Username,
          success: "You are already signed in.",
        });
      })
      .catch((err) => {
        console.log(`There is an error fetching your data: ${err}`);
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
      req.logIn(user, (err) => {
        if (err) return next(err);
        Todos.find({ Author: user._id })
          .then((todos) => {
            return res.render("profile", {
              todos: todos,
              name: user.Username,
              success: "You are now signed in",
            });
          })
          .catch((err) => {
            console.log(`There is an error fetching your data: ${err}`);
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
