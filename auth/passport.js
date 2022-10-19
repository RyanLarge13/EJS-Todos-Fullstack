import passport from 'passport';
import passportJwt from 'passport-jwt';
import localStrategy from 'passport-local';
import dotenv from "dotenv";
import { Users } from "../models/userModel.js";
const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
localStrategy.Strategy;
dotenv.config();

//This is a piece of middleware for authenticating users when logged in and traveling to different end points. It uses a jwt strategy to check for the token in http headers.
passport.use(
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, callback) => {
      Users.findOne({ Username: username }, (err, user) => {
        if (err) {
          return callback(err);
        }
        if (!user) {
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
        }
        if (!user.validatePassword(password)) {
          return callback(null, false, {
            message: "You have the incorrect password",
          });
        }
        return callback(null, user);
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => callback(null, user))
        .catch((err) => callback(err));
    }
  )
);

