const hotelModel = require("../../models/hotelModel");

const viewHotel = async (req, res) => {
  try {
    const username = req.session.username;
    const data = await hotelModel.find();
    res.render("admin/managerHotel/adminHotel", {
      layout: "layouts/ADMIN",
      hotel: data,
      username,
    });
  } catch (err) {
    console.log(err);
  }
};

const viewAddHotel = (req, res) => {
  const username = req.session.username;
  res.render("admin/managerHotel/add-hotel", {
    layout: "layouts/ADMIN",
    username,
  });
};

const addHotel = async (req, res) => {
  try {
    const username = req.session.username;
    const { hotelName, hotelAddress, hotelPhone, hotelStandard, hotelCity } =
      req.body;

    // Validation checks
    const errors = [];

    if (!hotelName || hotelName.length < 3 || hotelName.length > 100) {
      errors.push("Tên khách sạn phải có độ dài từ 3 đến 100 ký tự.");
    }
    if (
      !hotelAddress ||
      hotelAddress.length < 10 ||
      hotelAddress.length > 200
    ) {
      errors.push("Địa chỉ khách sạn phải có độ dài từ 10 đến 200 ký tự.");
    }
    if (!hotelPhone || !/^\d{10}$/.test(hotelPhone.toString())) {
      errors.push("Số điện thoại phải có đúng 10 chữ số.");
    }
    if (hotelStandard < 1 || hotelStandard > 5) {
      errors.push("Tiêu chuẩn khách sạn phải nằm trong khoảng từ 1 đến 5.");
    }
    if (!hotelCity || hotelCity.length < 2 || hotelCity.length > 100) {
      errors.push("Thành phố phải có độ dài từ 2 đến 100 ký tự.");
    }

    if (errors.length > 0) {
      return res.render("admin/managerHotel/add-hotel", {
        layout: "layouts/ADMIN",
        username,
        errors,
        hotel: {
          hotelName,
          hotelAddress,
          hotelPhone,
          hotelStandard,
          hotelCity,
        },
      });
    }
    const newHotel = new hotelModel({
      hotelName,
      hotelAddress,
      hotelPhone,
      hotelStandard,
      hotelCity,
    });
    await newHotel.save();
    res.redirect("/admin/hotels");
  } catch (err) {
    console.log("Error when adding hotel: ", err);
    res.status(400).send("Error adding hotel");
  }
};

const viewEditHotel = async (req, res) => {
  try {
    const username = req.session.username;
    const { id } = req.params;
    const hotel = await hotelModel.findById(id);
    res.render("admin/managerHotel/edit-hotel", {
      layout: "layouts/ADMIN",
      username,
      hotel,
    });
  } catch (err) {
    console.log("Error when show edit Hotel: ", err);
  }
};

const editHotel = async (req, res) => {
  try {
    const { hotelName, hotelAddress, hotelPhone, hotelStandard, hotelCity } =
      req.body;
    await hotelModel.findByIdAndUpdate(req.params.id, {
      hotelName,
      hotelAddress,
      hotelPhone,
      hotelStandard,
      hotelCity,
    });
    res.redirect("/admin/hotels");
  } catch (err) {
    console.log("Error when updating hotel: ", err);
    res.status(400).send("Error updating hotel");
  }
};

module.exports = {
  viewHotel,
  addHotel,
  viewAddHotel,
  viewEditHotel,
  editHotel,
};
