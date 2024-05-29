const hotelModel = require("../../models/hotelModel");

const viewHotel = async (req, res) => {
  try {
    const data = await hotelModel.find();
    res.render("admin/adminHotel", {
      layout: "layouts/ADMIN",
      hotel: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const addHotel = (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  viewHotel,
  addHotel,
};
