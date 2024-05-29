const express = require("express");
const router = express.Router();

const checkLogin = require("../middleware/requireLogin");

const authController = require("../controller/Admin/authAdminController");
const adminController = require("../controller/Admin/adminController");
const hotelController = require("../controller/Admin/hotelAdminController");

// Route GET 'Login'

// router for admin auth
router.get("/register", authController.RegisterPage);
router.post("/register", authController.Register);
router.get("/login", authController.LoginPage);
router.post("/login", authController.Login);

router.use(checkLogin);
//router home page for administration
router.get("/", adminController.adminHomepage);

// router for Hotel
router.get("/hotel", hotelController.viewHotel);
module.exports = router;
