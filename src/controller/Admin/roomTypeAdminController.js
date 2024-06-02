const RoomsTypeModel = require("../../models/roomtypeModel");

const viewRoomsTypes = async (req, res) => {
  try {
    const username = req.session.username;
    const roomsTypes = await RoomsTypeModel.find();
    res.render("admin/managerRoomType/index_room_type", {
      layout: "layouts/ADMIN",
      title: "Room Types Management",
      roomsTypes: roomsTypes,
      username,
    });
  } catch (error) {
    console.log(error);
  }
};

const newRoomTypeForm = async (req, res) => {
  const username = req.session.username;
  res.render("admin/managerRoomType/room_type", {
    layout: "layouts/ADMIN",
    title: "Add new Room Types",
    username,
  });
};

const createRoomType = async (req, res) => {
  try {
    const username = req.session.username;
    const { type, description } = req.body;
    const newRoomType = new RoomType({ type, description });
    await newRoomType.save();
    const message = "Create new room type successfully !!!";
    res.redirect("/admin/roomsTypes", {
      username,
      message,
    });
  } catch (err) {
    console.log(err);
    res.render("error", { message: err.message, stack: err.stack });
  }
};

const editRoomTypeForm = async (req, res) => {
  try {
    const username = req.session.username;
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType) {
      return res.render("error", { message: "Room type not found", stack: "" });
    }
    res.render("admin/managerRoomType/adminHotel", {
      layout: "layouts/ADMIN",
      username,
      roomType,
    });
  } catch (err) {
    console.log(err);
    res.render("error", { message: err.message, stack: err.stack });
  }
};

const updateRoomType = async (req, res) => {};

const deleteRoomType = async (req, res) => {};

module.exports = {
  viewRoomsTypes,
  newRoomTypeForm,
  createRoomType,
  editRoomTypeForm,
  updateRoomType,
  deleteRoomType,
};
