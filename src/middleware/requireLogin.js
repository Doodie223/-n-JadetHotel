const requireLogin = (req, res, next) => {
  if (!req.session || !req.session.loggedIn) {
    return res.redirect("/admin/login");
  } else {
    next();
  }
};

module.exports = requireLogin;
