export const authenticateRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.save((err) => console.log(err));
    return next();
  } else {
    res.render("signin", {
      err: "You need to login first",
    });
  }
};
