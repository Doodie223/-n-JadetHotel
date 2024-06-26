const express = require("express");
const router = express.Router();

const checkLogin = require("../middleware/requireLogin");

const authController = require("../controller/Admin/authAdminController");
const adminController = require("../controller/Admin/adminController");
const hotelController = require("../controller/Admin/hotelAdminController");
const roomController = require("../controller/Admin/roomAdminController");
const roomTypeController = require("../controller/Admin/roomTypeAdminController");

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
router.get("/hotels", hotelController.viewHotel);
router.get("/hotels/view/:id", hotelController.viewDetailHotel);
router.get("/hotels/add", hotelController.viewAddHotel);
router.post("/hotels/add", hotelController.addHotel);
router.get("/hotels/edit/:id", hotelController.viewEditHotel);
router.post("/hotels/edit/:id", hotelController.editHotel);
router.post("/hotels/delete/:id", hotelController.deleteHotel);

// router for Rooms
router.get("/rooms/viewbyHotel/:idHotel", roomController.viewRooms);
router.get("/rooms/viewbyHotel/:id/addNew", roomController.viewAddRooms);
router.post("/rooms/viewbyHotel/:id/addNew", roomController.addRooms);
router.get(
  "/rooms/viewbyHotel/:idHotel/edit/:idRoom",
  roomController.viewEditRoom
);
router.post(
  "/rooms/viewbyHotel/:idHotel/edit/:idRoom",
  roomController.updateRoom
);
router.delete(
  "/rooms/viewbyHotel/:idHotel/delete/:idRoom",
  roomController.deleteRoom
);

// router for roomsTypes
router.get("/roomsType", roomTypeController.viewRoomsTypes);
router.get("/roomsType/new", roomTypeController.newRoomTypeForm);
router.post("/roomsType/new", roomTypeController.createRoomType);
router.get("/roomsType/edit/:id", roomTypeController.editRoomTypeForm);
router.post("/roomsType/edit/:id", roomTypeController.updateRoomType);
router.delete("/roomsType/delete/:id", roomTypeController.deleteRoomType);

module.exports = router;
