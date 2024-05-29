const hotelModel = require("../../models/hotelModel");

const viewHotel = async (req, res) => {
  try {
    const username = req.session.username;
    const data = await hotelModel.find();
    res.render("admin/adminHotel", {
      layout: "layouts/ADMIN",
      hotel: data,
      username,
    });
  } catch (err) {
    console.log(err);
  }
};

const addHotel = (req, res) => {
  try {
    const username = req.session.username;
  } catch (error) {}
};

module.exports = {
  viewHotel,
  addHotel,
};
