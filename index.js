require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();
var flash = require("connect-flash");
const cookie = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://192.168.29.2:3000"],
  })
);

app.use(flash());
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(cookie());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`port is listening on ${process.env.SERVER_PORT}`);
});
