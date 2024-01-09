require("dotenv").config();
var jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const userAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.jwt;
    
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    
    const user = await User.findOne({ _id: verifyUser._id });
    
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 400,
    });
  }
};

module.exports = userAuth;
