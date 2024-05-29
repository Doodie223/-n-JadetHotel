const express = require("express");
const router = express.Router();

const adminController = require("../controller/Admin/authAdminController");

// Route GET 'Login'
router.get("/login", adminController.LoginPage);
//router.post('/login', adminController.Login)

// router for Hotel

module.exports = router;
