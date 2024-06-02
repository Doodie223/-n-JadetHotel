const hotelModel = require("../../models/hotelModel");
//const upload = require("../../service/uploadService");
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
}).array("hotelImages", 10);

// Your addHotel function
const addHotel = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("Error uploading files", err);
      return res.status(400).send("Error uploading files");
    }

    try {
      const username = req.session.username;
      const { hotelName, hotelAddress, hotelPhone, hotelStandard, hotelCity } =
        req.body;

      // if (errors.length > 0) {
      //   return res.render("admin/managerHotel/add-hotel", {
      //     layout: "layouts/ADMIN",
      //     username,
      //     errors,
      //     hotel: {
      //       hotelName,
      //       hotelAddress,
      //       hotelPhone,
      //       hotelStandard,
      //       hotelCity,
      //     },
      //   });
      // }

      const hotelImages = req.files.map((file) => `/uploads/${file.filename}`);

      const newHotel = new hotelModel({
        hotelName,
        hotelAddress,
        hotelPhone,
        hotelStandard,
        hotelCity,
        hotelImages,
      });
      await newHotel.save();
      res.redirect("/admin/hotels");
    } catch (err) {
      console.log("Error when adding hotel: ", err);
      res.status(400).send("Error adding hotel");
    }
  });
};

const viewHotel = async (req, res) => {
  try {
    const username = req.session.username;
    const data = await hotelModel.aggregate([
            {
                $lookup: {
                    from: 'rooms', // the collection name in MongoDB is usually the plural of the model name
                    localField: '_id',
                    foreignField: 'hotel_id',
                    as: 'rooms'
                }
            },
            {
                $addFields: {
                    roomCount: { $size: '$rooms' }
                }
            }
        ]);
    res.render("admin/managerHotel/adminHotel", {
      layout: "layouts/ADMIN",
      hotel: data,
      username,
    });
  } catch (err) {
    console.log(err);
  }
};

const viewDetailHotel = async (req, res) => {
  try {
    const username = req.session.username;
    const hotel = await hotelModel.findById(req.params.id);
    res.render("admin/managerHotel/detail-hotel", {
      layout: "layouts/ADMIN",
      hotel: hotel,
      username,
    });
  } catch (err) {
    console.log("Error viewing hotel detail: ", err);
    res.status(400).send("Error viewing hotel detail");
  }
};

const viewAddHotel = (req, res) => {
  const username = req.session.username;
  res.render("admin/managerHotel/add-hotel", {
    layout: "layouts/ADMIN",
    username,
  });
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

    upload(req, res, async (err) => {
      if (err) {
        console.log("Error uploading files", err);
        return res.status(400).send("Error uploading files");
      }

      // Kiểm tra nếu có tệp được tải lên, thực hiện cập nhật hình ảnh
      if (req.files && req.files.length > 0) {
        // Lấy đường dẫn của tệp hình ảnh mới
        const hotelImages = req.files.map(
          (file) => `/uploads/${file.filename}`
        );
        // Cập nhật thông tin khách sạn cùng với hình ảnh mới
        await hotelModel.findByIdAndUpdate(req.params.id, {
          hotelName,
          hotelAddress,
          hotelPhone,
          hotelStandard,
          hotelCity,
          hotelImages, // Thêm hình ảnh mới vào mảng
        });
      } else {
        // Nếu không có hình ảnh mới được tải lên, chỉ cập nhật thông tin khách sạn
        await hotelModel.findByIdAndUpdate(req.params.id, {
          hotelName,
          hotelAddress,
          hotelPhone,
          hotelStandard,
          hotelCity,
        });
      }

      // Chuyển hướng về trang chi tiết khách sạn đã cập nhật
      res.redirect(`/admin/hotels/view/${req.params.id}`);
    });
  } catch (err) {
    console.log("Error when updating hotel: ", err);
    res.status(400).send("Error updating hotel");
  }
};

const deleteHotel = async (req, res) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.redirect("/admin/hotels");
  } catch (err) {
    console.log("Error when deleting hotel: ", err);
    res.status(400).send("Error deleting hotel");
  }
};

module.exports = {
  viewHotel,
  addHotel,
  viewAddHotel,
  viewEditHotel,
  editHotel,
  viewDetailHotel,
  deleteHotel,
};
