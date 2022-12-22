import express from "express";
import dotenv from "dotenv";
import parser from "body-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    expires: new Date(Date.now() + 30 * 86400 * 1000),
  })
);
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./client");
app.use(express.static("./client"));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", signupRouter, signinRouter, todoRouter, profileRouter);

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
      welcome: "WELCOME",
    });
  }
});

app.get("/healthcheck", (req, res) => {
  res.status(200).send();
});

app.listen(port, "0.0.0.0", () =>
  console.log(
    `Your app is listening on port ${port} : http://localhost:${port}`
  )
);

export default app;
