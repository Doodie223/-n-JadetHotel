const roomModel = require("../../models/roomModel");
const hotelModel = require("../../models/hotelModel");
const roomTypeModel = require("../../models/roomtypeModel");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
}).array("roomImages", 10); // Changed to roomImages

const viewRooms = async (req, res) => {
  try {
    const username = req.session.username;
    const hotel = await hotelModel.findById(req.params.idHotel);
    const rooms = await roomModel.find({ hotel_id: req.params.idHotel });

    // Tạo một mảng chứa các promise của các truy vấn loại phòng
    const roomTypePromises = rooms.map((room) =>
      roomTypeModel.findById(room.roomtype_id)
    );

    // Chờ tất cả các promise hoàn thành
    const roomTypes = await Promise.all(roomTypePromises);

    // Kết hợp thông tin phòng và loại phòng
    const roomsWithTypes = rooms.map((room, index) => {
      return {
        ...room.toObject(),
        roomType: roomTypes[index],
      };
    });

    res.render("admin/managerRoom/index_room", {
      layout: "layouts/ADMIN",
      username,
      rooms: roomsWithTypes,
      hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const viewAddRooms = async (req, res) => {
  try {
    const username = req.session.username;
    const hotelId = req.params.id;
    const roomTypes = await roomTypeModel.find({});
    res.render("admin/managerRoom/add_room", {
      layout: "layouts/ADMIN",
      username,
      hotelId,
      roomTypes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const addRooms = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading files", err);
      return res.status(400).send("Error uploading files");
    }

    try {
      const hotel_id = req.params.id;
      const { roomtype_id, number, acreage, price } = req.body;
      const roomImages = req.files.map((file) => `/uploads/${file.filename}`);

      const newRoom = new roomModel({
        hotel_id,
        roomtype_id,
        number,
        acreage,
        price,
        roomImages,
      });

      await newRoom.save();
      res.redirect(`/admin/rooms/viewbyHotel/${hotel_id}`);
    } catch (error) {
      console.error("Error when adding room: ", error);
      res.status(400).send("Error adding room");
    }
  });
};

const viewEditRoom = async (req, res) => {
  try {
    const username = req.session.username;
    const { idHotel, idRoom } = req.params;
    const room = await roomModel.findById(idRoom);
    const roomTypes = await roomTypeModel.find({});
    res.render("admin/managerRoom/edit_room", {
      layout: "layouts/ADMIN",
      username,
      room,
      roomTypes,
      idHotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const updateRoom = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading files", err);
      return res.status(400).send("Error uploading files");
    }

    try {
      const { idHotel, idRoom } = req.params;
      const { roomtype_id, number, acreage, price } = req.body;
      const roomImages = req.files.map((file) => `/uploads/${file.filename}`);

      await roomModel.findByIdAndUpdate(
        idRoom,
        { roomtype_id, number, acreage, price, roomImages },
        { new: true }
      );

      res.redirect(`/rooms/viewbyHotel/${idHotel}`);
    } catch (error) {
      console.error("Error when updating room: ", error);
      res.status(400).send("Error updating room");
    }
  });
};

const deleteRoom = async (req, res) => {
  try {
    const { idHotel, idRoom } = req.params;
    await roomModel.findByIdAndDelete(idRoom);
    res.redirect(`/rooms/viewbyHotel/${idHotel}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  viewRooms,
  viewAddRooms,
  addRooms,
  viewEditRoom,
  updateRoom,
  deleteRoom,
};
