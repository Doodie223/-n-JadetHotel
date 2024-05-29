const express = require("express");
const router = express.Router();

const checkLogin = require("../middleware/requireLogin");

const authController = require("../controller/Admin/authAdminController");
const adminController = require("../controller/Admin/adminController");
const hotelController = require("../controller/Admin/hotelAdminController");

// Route GET 'Login'

// router for admin auth
router.get("/login", authController.LoginPage);
router.post("/login", authController.Login);
router.get("/logout", authController.Logout);

router.use(checkLogin);
//router home page for administration
router.get("/", adminController.adminHomepage);

// router for register new administrator
router.get("/register", authController.RegisterPage);
router.post("/register", authController.Register);

// router for Hotel
router.get("/hotel", hotelController.viewHotel);
module.exports = router;
