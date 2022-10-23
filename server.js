import express from "express";
import dotenv from "dotenv";
import parser from "body-parser";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { signupRouter } from "./routes/signupRoute.js";
import { signinRouter } from "./routes/signinRoutes.js";
import { authorize } from "./auth/passport.js";
import { todoRouter } from "./routes/todoRoutes.js";
import { profileRouter } from "./routes/profileRoutes.js";
authorize(passport);
dotenv.config();
connectDB();

const port = process.env.PORT || 8080;
const app = express();

//Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./client/views");
app.use(express.static("./client/views"));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", signupRouter, signinRouter, todoRouter, profileRouter);

//Incorporating the get request for the applications main index.ejs file from server js.
app.get("/", (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).render("index", {
      profile: true,
      welcome: `Welcome back ${user.Username}`,
    });
  } else {
    res.status(200).render("index", {
    	profile: false, 
    	welcome: 'Please sign in, or signup for a new account to make your very own custom todo list!!'
    });
  }
});

app.listen(port, '0.0.0.0', () =>
  console.log(`Your app is listening on port ${port} : http://localhost:8080`)
);
