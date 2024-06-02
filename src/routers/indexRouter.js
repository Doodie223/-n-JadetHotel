
const express = require('express');
const router = express.Router();

const indexController = require("../controller/indexController");
const roomController = require("../controller/roomController");
const paymentController = require("../controller/paymentController");
const orderController = require("../controller/orderController");

// Route GET '/'
router.get('/', indexController.Homepage);
// Route GET '/about'
router.get('/about', indexController.About);
// Route GET 'Login'
router.get('/login', indexController.LoginPage);
router.post('/login', indexController.Login);

//Route show rooms
router.get('/hotels', roomController.showHotel);
router.get('/roomDetail', roomController.roomDetails);
router.get('/showroom', roomController.showRoomPage);

//Route payment
router.get('/payment', paymentController.paymentPage);

//Route order 
router.get('/order', orderController.orderPage);



module.exports = router;
