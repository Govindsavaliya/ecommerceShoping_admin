const express = require("express");
const routes = express.Router();
const admin = require("./admin");
const client = require("./client");

routes.use("/admin", admin);
routes.use("/api", client);

module.exports = routes;
