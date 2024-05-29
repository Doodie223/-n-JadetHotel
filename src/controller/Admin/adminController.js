const adminHomepage = (req, res) => {
  const username = req.session.username;
  res.render("admin/adminIndex", {
    layout: "layouts/ADMIN",
    username,
  });
};

module.exports = {
  adminHomepage,
};
