import { Users } from "../models/userModel.js";

//Global functions for handling data
const createUser = async (email, username, password, res) => {
  const newUser = await Users.create({
    Email: email,
    Username: username,
    Password: password,
  });
  newUser.save();
  res.status(204).render("/login", {
    success: "You can now login!",
  });
};

//Rendering the login/registration page
export const renderLogin = (req, res) => {
  res.render("login");
};

//Logging an existing user into the application and redirecting to authenticated route or registering if no user exsists
export const loginRegister = async (req, res) => {
  const { email, username, password } = req.body;
  await Users.findOne({ Username: username }).then((user) => {
    if (!user) {
      return createUser(email, username, password, res);
    } else {
      res.status(204).render("profile", {
        name: username,
      });
    }
  });
};

//Logging out the session and user
export const logout = (req, res) => {};
