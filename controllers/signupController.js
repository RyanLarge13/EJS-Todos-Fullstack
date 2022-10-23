import bcrypt from "bcryptjs";
import { Users } from "../models/userModel.js";
import { Todos } from "../models/todoModel.js";
import { FinishedTodos } from "../models/finishedTodosModel.js";

//Global functions for handling authentication and creating Users
const createUser = async (email, username, password, res) => {
  Users.findOne({ Username: username })
    .then(async (user) => {
      if (user) {
        return res.render("signup", {
          err: "A user with this username already exsists. Please use a different name.",
        });
      }
      if (!user) {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
          Email: email,
          Username: username,
          Password: hash,
        });
        newUser.save();
        return res.render("signin", {
          success: "You can now sign in!",
        });
      }
    })
    .catch((err) => console.log(err));
};

export const renderSignup = async (req, res) => {
  const user = req.user;
  if (user) {
    const todos = await Todos.find({ Author: user._id });
    const doneTodos = await FinishedTodos.find({ Author: user._id });
    return res.render("profile", {
      todos: todos,
      finishedTodos: doneTodos, 
      name: user.Username,
      success: "Why are you trying to sign in?? Here is your profile fool",
    });
  } else {
    res.status(200).render("signup");
  }
};

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  await Users.findOne({ Email: email }).then((user) => {
    if (!user) {
      return createUser(email, username, password, res);
    }
    if (user) {
      res.render("signin", {
        err: `There is already a user with this account. Please sign in.`,
      });
    }
  });
};
