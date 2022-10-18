import passport from "passport";
import localStrategy from 'passport-local';
import passportJwt from 'passport-jwt';
import dotenv from 'dotenv';
import { Users } from '../models/userModel.js';
const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
localStrategy.Strategy;
dotenv.config();

passport.use(
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, callback) => {
      Users.findOne({ Username: username }, (err, user) => {
        if (err) {
          console.log(`You have an error: ${err}`);
          return callback(err);
        }
        if (!user) {
          return callback(null, false);
        }
        if (!user.validatePassword(password)) {
          return callback(null, false, {
            message: "Incorrect password"
          })
        }
        return callback(null, user);
      });
    }
  )
);

passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, (jwtPayload, callback) => {
  	return Users.findById(jwtPayload._id).then((user) => callback(null, user)).catch((err) => callback(err));
  })
);