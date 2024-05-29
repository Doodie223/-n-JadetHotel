const Admin = require("../../models/adminModel");

const RegisterPage = (req, res) => {
  res.render("admin/adminRegister", {
    layout: "layouts/ADMIN",
  });
};

const Register = async (req, res) => {
  try {
    const { adName, adEmail, adPassword, adPhone } = req.body;
    if (!adName || !adEmail || !adPassword || !adPhone) {
      return res.render("admin/adminRegister", {
        layout: "layouts/ADMIN",
        error: "Vui lòng cung cấp đầy đủ thông tin !!!",
      });
    }
    const existingAdmin = await Admin.findOne({ adEmail });
    if (existingAdmin) {
      return res.render("admin/adminRegister", {
        error: "Email is already registered.",
      });
    }

    // Tạo một tài khoản admin mới
    const newAdmin = new Admin({
      adName,
      adEmail,
      adPassword,
      adPhone,
    });

    // Lưu tài khoản admin mới vào cơ sở dữ liệu
    await newAdmin.save();

    res.redirect("/admin/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const LoginPage = (req, res) => {
  res.render("admin/adminLogin", {
    layout: "layouts/ADMIN",
  });
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render("admin/adminLogin", {
        layout: "layouts/ADMIN",
        error: "Vui lòng cung cấp email và mật khẩu admin.",
      });
    }

    const admin = await Admin.findOne({ adEmail: email });
    console.log(admin);
    if (!admin) {
      return res.render("admin/adminLogin", {
        layout: "layouts/ADMIN",
        error: "Admin không tồn tại!!! ",
      });
    }
    if (admin !== null) {
      if (admin.isAdmin) {
        req.session.loggedIn = true;
        req.session.username = admin.adName;
        req.session.isAdmin = true;
        res.redirect("/admin");
      } else {
        res.render("admin/adminLogin", {
          layout: "layouts/ADMIN",
          error: "Bạn không có quyền truy cập vào trang admin.",
        });
      }
    } else {
      res.render("admin/adminLogin", {
        layout: "layouts/ADMIN",
        error: "Tên đăng nhập hoặc mật khẩu không chính xác.",
      });
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log(error);
    res.status(500).send("Có lỗi xảy ra, vui lòng thử lại sau.");
  }
};

const Logout = (req, res) => {
  req.session.destroy();
  res.redirect("admin/login");
};
module.exports = {
  RegisterPage,
  Register,
  LoginPage,
  Login,
  Logout,
};
