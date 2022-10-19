export const authenticateRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.render("html/login", {
        err: "You need to login first",
      });
    }
  };