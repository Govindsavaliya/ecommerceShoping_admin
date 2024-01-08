const User = require("../../model/user.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userRegister = async (req, res) => {
  try {
    const { phoneNumber, email, password, confirmPassword } = req.body;
    if (!phoneNumber && !email && !password && !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all the fields",
        status: 400,
        Success: 0,
      });
    }
    if (password == confirmPassword) {
      const token = jwt.sign({ email, password }, "SECRETKEY", {
        expiresIn: "7d",
      });
      const userData = new User({ email, password, phoneNumber, token });
      await userData.save();
      res.cookie("userInformation", phoneNumber, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      });

      return res.status(201).json({
        message: "User Registered!",
        status: 201,
        userToken: userData.token,
        Success: 1,
      });
    } else {
      return res.status(400).json({
        message: "Password and confirm password is not same",
        status: 400,
        Success: 0,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: 400,
      Success: 0,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        status: 400,
        Success: 0,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        Success: 0,
        status: 400,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({
        Success: 0,
        status: 400,
        message: "Invalid password",
      });
    }

    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
    });
    return res.status(200).json({
      message: "Login successfully",
      status: 200,
      User: token,
      Success: 1,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      Success: 0,
    });
  }
};

exports.userLogout = async (req, res) => {
  try {
    req.user.token = null;
    res.clearCookie("jwt");
    await req.user.save();
    return res
      .status(200)
      .json({ message: " Logout successfully", Success: 1 });
  } catch (error) {
    return res.status(400).json({
      message: "Internal Server Error",
      status: 400,
      Success: 0,
    });
  }
};

exports.getLoginUser = async (req, res) => {
  const userId = await req?.user;

  try {
    if (userId) {
      const user = await User.findById(userId).select("-password");
      return res.status(200).json({
        Success: 1,
        status: 200,
        message: "Login User",
        User: user,
      });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      Success: 0,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = await req?.user;
    const user = await User.findById(userId);

    if (!oldPassword && !newPassword && !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all the fields",
        status: 400,
        Success: 0,
      });
    }
    if (newPassword == confirmPassword) {
      if (!bcrypt.compare(newPassword, user?.password)) {
        return res.status(400).json({
          message: "Invalid password",
          status: 400,
          Success: 0,
        });
      } else {
        user.password = newPassword;
        await user.save();

        return res.status(200).json({
          message: "Password Changed Successfully",
          status: 200,
          Success: 1,
        });
      }
    } else {
      return res.status(400).json({
        message: "New Password and Confirm Password is not match",
        status: 400,
        Success: 0,
      });
    }
  } catch (error) {
    console.log("error:::", error);
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      Success: 0,
    });
  }
};
