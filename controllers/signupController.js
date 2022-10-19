import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users } from "../models/userModel.js";

//Global functions for handling authentication and creating Users
const createUser = async (email, username, password, res) => {
  const hash = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    Email: email,
    Username: username,
    Password: hash,
  });
  const token = await jwt.sign(JSON.stringify(newUser), process.env.JWT_SECRET);
  newUser.save();
  res.json({ token: token });
  //res.status(201).render("signin", {
  //success: "Thank you for registering! You can now sign in.",
  //});
};

export const renderSignup = (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).render("profile", {
      name: user.Username,
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
      res.render("signup", {
        err: "There is already a user with this account.",
      });
    }
  });
};
