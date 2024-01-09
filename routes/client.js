const express = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
  getLoginUser,
  changePassword,
  updateShippingAddress,
  updateUserAccount,
  contactUs,
  addNewsletter,
} = require("../controller/client/user.conttroller");
const userAuth = require("../middleware/userAuth");
const {
  getCountry,
  getStateCities,
} = require("../controller/client/country.controller");
const routes = express.Router();

// User 
routes.post("/register", userRegister);
routes.post("/login", userLogin);
routes.get("/logout", userAuth, userLogout);
routes.get("/login-user", userAuth, getLoginUser);
routes.post("/change-password", userAuth, changePassword);
routes.put("/update-shipping-address", userAuth, updateShippingAddress);
routes.post("/update-user-account", userAuth, updateUserAccount);
routes.post("/contact-us", contactUs);
routes.post("/news-letter", addNewsletter);

routes.get("/country", getCountry);
routes.get("/state-cities", getStateCities);

module.exports = routes;
