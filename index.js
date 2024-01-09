require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();
const routes = require("./routes");
var flash = require("connect-flash");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const cookie = require("cookie-parser");
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
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
app.listen(process.env.PORT, () => {
  console.log(`port is listening on ${process.env.PORT}`);
});
