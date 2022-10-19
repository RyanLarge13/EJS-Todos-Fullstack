import jwt from "jsonwebtoken";
import passport from 'passport';
import { Users } from "../models/userModel.js";

//Creating a separate function for handling the signing of a jwt to the user.
let generateJWTToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
      subject: user.Username,
      expiresIn: "7d",
      algorithm: "HS256",
    });
  };

export const renderSignin = (req, res) => {
    res.render('signin');
}

//This functionality handles the logging in of users, authenticates them with passport and handles the response to send a jwt to the http header
export const login = (req, res) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
        return res.status(400).json({
        message: "Something is not right",
        user: user,
        });
    }
    if (info) {
        return res.render('signin', {
            err: info.message,
        });
    }
    req.login(user, { session: false }, (err) => {
        if (err) res.send(err);
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
    });
    })(req, res);
}