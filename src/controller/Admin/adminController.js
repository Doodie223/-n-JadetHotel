const adminHomepage = (req, res) => {
  res.render("admin/adminIndex", {
    layout: "layouts/ADMIN",
  });
};

module.exports = {
  adminHomepage,
};
