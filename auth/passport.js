import JWTStrategy from "passport-jwt";
import ExtractJwt from "passport-jwt";
import dotenv from "dotenv";
import { Users } from "../models/userModel.js";
JWTStrategy.Strategy;
ExtractJwt.ExtractJwt;
dotenv.config();

let ops = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    Users.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
