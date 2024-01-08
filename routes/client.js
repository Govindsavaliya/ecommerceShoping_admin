const express = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
  getLoginUser,
  changePassword,
} = require("../controller/client/user.conttroller");
const userAuth = require("../middleware/userAuth");
const routes = express.Router();

routes.post("/register", userRegister);
routes.post("/login", userLogin);
routes.get("/logout", userAuth, userLogout);
routes.get("/login-user", userAuth, getLoginUser); 
routes.post("/change-password", userAuth, changePassword);

module.exports = routes;
