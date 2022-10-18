import { Users } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import passport from 'passport';
import '../auth/passportjwt.js';

//Global functions for handling data and authentication
const generateJWTToken = (user) => {
  return (
    jwt.sign(user, process.env.JWT_SECRET, {
      subject: user.Username,
      expiresIn: '7d',
      algorithm: 'HS512',
    })
  )
};

const createUser = async (email, username, password, res) => {
  const newUser = await Users.create({
    Email: email,
    Username: username,
    Password: password,
  });
  newUser.save();
  res.status(201).render("login", {
    success: "You can now login!",
  });
};

//Rendering the login/registration page
export const renderLogin = (req, res) => {
  res.render("login");
};

//Logging an existing user into the application and redirecting to authenticated route or registering if no user exsists
export const loginRegister = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
      err: 'Something is not right',
      user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) res.send(err);
      const token = generateJWTToken(user.toJSON());
      return res.json({ user, token })
    });
  })(req, res)
  // const { email, username, password } = req.body;
  // await Users.findOne({ Email: email }).then((user) => {
  //   if (user) {
  //     const displayName = user.Username.split(' ')[0];
  //     return res.status(201).render("profile", {
  //       name: displayName,
  //     });
  //   }
  //   if (!user) {
  //     return createUser(email, username, password, res);
  //   } 
  // });
};
