const express = require("express");
const routes = express.Router();
const passport = require("passport");

require("../middleware/localStrategy");
const session = require("express-session");
const { checkAdmin, checkLogin } = require("../middleware/checkLogin");
const {
  adminLogin,
  adminLoginSuccess,
  adminDashboard,
} = require("../controller/admin/login.controller");

routes.use(
  session({
    name: "admin",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY_ADMIN,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);
routes.use(passport.initialize());
routes.use(passport.session());

routes.get("/login", checkAdmin, adminLogin);
routes.post(
  "/login-data",
  passport.authenticate("local", { failureRedirect: "/admin/login" }),
  adminLoginSuccess
);
routes.get("/Dashboard", adminDashboard);

module.exports = routes;
