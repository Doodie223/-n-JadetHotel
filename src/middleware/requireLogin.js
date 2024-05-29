const requireLogin = (req, res, next) => {
  // Kiểm tra xem session có tồn tại không
  if (!req.session || !req.session.loggedIn) {
    // Nếu không, chuyển hướng người dùng đến trang đăng nhập
    return res.redirect("/admin/login");
  } else {
    // Nếu có, cho phép người dùng tiếp tục vào trang tiếp theo
    next();
  }
};

module.exports = requireLogin;
