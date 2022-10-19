import express from "express";
import dotenv from "dotenv";
import parser from "body-parser";
import { connectDB } from "./config/db.js";
import { signupRouter } from "./routes/signupRoute.js";
dotenv.config();
connectDB();

const port = process.env.PORT || 8080;
const app = express();

//Middleware
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use("/", signupRouter);
app.use(express.static("views"));
app.set("view engine", "ejs");

//Incorporating the get request for the applications main index.ejs file from server js.
app.get("/", (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).render("index", {
      profile: true,
      welcome: `Welcome back ${user.Username}`,
    });
  } else {
    res.status(200).render("index");
  }
});

app.listen(port, () =>
  console.log(`Your app is listening on port ${port} : http://localhost:8080`)
);
