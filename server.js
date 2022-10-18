import express from "express";
import dotenv from "dotenv";
import parser from "body-parser";
import { connectDB } from "./config/db.js";
import { loginRouter } from "./routes/loginRoutes.js";
import { profileRouter } from "./routes/profileRoutes.js";
import { todoRouter } from './routes/todoRoutes.js';
dotenv.config();
connectDB();

const port = process.env.PORT || 8080;
const app = express();

//Middleware
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(loginRouter, profileRouter);
app.use('/:me', todoRouter);
app.use(express.static("views"));
app.set("view engine", "ejs");

//Incorporating the get request for the applications main index.ejs file from the server js.
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`Your app is listening on port ${port} : http://localhost:8080`));
