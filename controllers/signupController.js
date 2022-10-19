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
  newUser.save();
  const token = generateJWTToken(newUser)
  res.json({ token: token });
};

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
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
        err: `There is already a user with this account. Please sign in.`,
      });
    }
  });
};
