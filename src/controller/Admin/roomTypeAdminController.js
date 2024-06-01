const RoomsTypeModel = require("../../models/roomtypeModel");

const viewRoomsTypes = async (req, res) => {
  try {
    const username = req.session.username;
    const successMessage = req.query.successMessage;
    const roomsTypes = await RoomsTypeModel.find();
    res.render("admin/managerRoomType/index_room_type", {
      layout: "layouts/ADMIN",
      title: "Room Types Management",
      roomsTypes: roomsTypes,
      username,
      successMessage,
    });
    req.query.successMessage = null;
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
    const { type, description } = req.body;
    const newRoomType = new RoomsTypeModel({ type, description });
    await newRoomType.save();
    req.session.successMessage = "Create new room type successfully !!!";
    res.redirect(`/admin/roomsType`);
  } catch (err) {
    console.log(err);
    res.render("error", { message: err.message, stack: err.stack });
  }
};

const editRoomTypeForm = async (req, res) => {
  try {
    const username = req.session.username;
    const roomType = await RoomsTypeModel.findById(req.params.id);
    if (!roomType) {
      return res.render("error", { message: "Room type not found", stack: "" });
    }
    res.render("admin/managerRoomType/room_type", {
      layout: "layouts/ADMIN",
      title: "Edit Room Types",
      roomType,
      username,
    });
  } catch (err) {
    console.log(err);
    res.render("error", { message: err.message, stack: err.stack });
  }
};

const updateRoomType = async (req, res) => {
  try {
    const { type, description } = req.body;
    await RoomsTypeModel.findByIdAndUpdate(req.params.id, {
      type,
      description,
    });
    const message = "Update room type successfully !!!";
    res.redirect(`/admin/roomsType`);
  } catch (err) {
    console.log(err);
    res.render("error", { message: err.message, stack: err.stack });
  }
};

const deleteRoomType = async (req, res) => {
  try {
    //const username = req.session.username;
    await RoomsTypeModel.findByIdAndDelete(req.params.id);
    const successMessage = "Delete room type successfully !!!";
    console.log(successMessage);
    res.json({ successMessage });
  } catch (err) {
    console.log(err);
    res.json({ errorMessage: err.message });
  }
};

module.exports = {
  viewRoomsTypes,
  newRoomTypeForm,
  createRoomType,
  editRoomTypeForm,
  updateRoomType,
  deleteRoomType,
};
