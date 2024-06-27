const hotelModel = require('../models/hotelModel')
const roomModel = require('../models/roomModel')
const roomTypeModel = require('../models/roomtypeModel')


const showHotel = async (req, res) => {
    const allHotels = await hotelModel.find();
    res.render('showhotel', {
        layout: 'layouts/main',
        allHotels: allHotels,
        title: 'Show Hotel'
    });
}

const roomDetails = (req, res) => {
    res.render('roomdetail', {
        layout: 'layouts/main'
    });
}
const showRoomPage = async (req, res) => {
    const hotel = await hotelModel.findById(req.params.id)
    const rooms = await roomModel.find({ hotel_id: req.params.id })
    const roomTypePromises = rooms.map((room) =>
        roomTypeModel.findById(room.roomtype_id)
    );

    // Chờ tất cả các promise hoàn thành
    const roomTypes = await Promise.all(roomTypePromises);

    // Kết hợp thông tin phòng và loại phòng
    const roomsWithTypes = rooms.map((room, index) => {
        return {
            ...room.toObject(),
            Room_Specs: roomTypes[index],
        };
    });
    res.render('showroom', {
        layout: 'layouts/main',
        hotel: hotel,
        allRoom: roomsWithTypes,
        title: 'Show Room'
    });
}

//show roomdetails

const showRoomDetailsPage = async (req, res) => {
    const room = await roomModel.findById(req.params.id);

    if (!room) {
        return res.status(404).send('Room not found');
    }

    const roomType = await roomTypeModel.findById(room.roomtype_id);
    const hotel = await hotelModel.findById(room.hotel_id);

    const roomWithType = {
        ...room.toObject(),
        Room_Specs: roomType,
        Hotel_Name: hotel.hotelName
    };
    console.log(roomWithType);
    res.render('roomdetail', {
        layout: 'layouts/main',
        room: roomWithType, // Truyền dữ liệu room và roomType vào đây
        title: 'Room Detail' // Đặt tiêu đề nếu cần thiết
    });
}
module.exports = {
    showHotel,
    roomDetails,
    showRoomPage,
    showRoomDetailsPage
}