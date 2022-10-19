import bcrypt from "bcryptjs";
import { Users } from "../models/userModel.js";
import { Todos } from "../models/todoModel.js";

//Global functions for handling authentication and creating Users
const createUser = async (email, username, password, res) => {
  const hash = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    Email: email,
    Username: username,
    Password: hash,
  });
  newUser.save();
  return res.render('signin', {
    success: 'You can now sign in!'
  });
};

export const renderSignup = (req, res) => {
  const user = req.user;
  if (user) {
    Todos.find({ Author: user._id }).then((todos) => {
      return res.render('profile', {
          todos: todos,
          name: user.Username,
          success: "Why are you trying to sign in?? Here is your profile fool"
      });
  }).catch((err) => {
      console.log(`There is an error fetching your data: ${err}`);
  })
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
