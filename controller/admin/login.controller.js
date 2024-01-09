exports.adminLogin = (req, res) => {
  try {
    return res.render("Login", {});
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: 400,
      Success: 0,
    });
  }
};

exports.adminLoginSuccess = (req, res) => {
  try {
    return res.redirect("/admin/dashboard");
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: 400,
      Success: 0,
    });
  }
};

exports.adminDashboard = (req, res) => {
  try {
    res.render("Dashboard");
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: 400,
      Success: 0,
    });
  }
};
