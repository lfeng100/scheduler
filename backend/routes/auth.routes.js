const router = require("express").Router();
const User = require("../controllers/user.controller");
const signupValidator = require("../validators/signupValidator");
const loginValidator = require("../validators/loginValidator")


module.exports = (app, passport) => {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    return next();
    res.status(401).send("Not Authorized");
  }

  //User Signup
  router.post("/signup", signupValidator, function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return next(err); }
      if (user) {
        res.status(200).send({ user_id: user.user_id, name: user.username, email: user.email });
      } else {
        res.status(401);
        res.end(info.message);
        return;
      }
    })(req, res, next);
  });

  // User Login
  router.post("/login", loginValidator, function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err) { return next(err); }
      if (user) {
        res.status(200).send({ user_id: user.user_id, name: user.username, email: user.email });
      } else {
        res.status(401);
        res.end(info.message);
        return;
      }
    })(req, res, next);
  });

  // User Logout
  router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.status(200).send("Success");
    });
  });

  // Verify User
  router.post("/verify", User.verify);

  // Dashboard
  router.get("/dashboard/:user_id", isLoggedIn, User.dashboard);

  app.use('/', router);
};
