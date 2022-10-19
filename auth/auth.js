export const authenticateRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.render("signin", {
        err: "You need to login first",
      });
    }
  };