const hotelModel = require('../models/hotelModel')
const roomModel = require('../models/roomModel')


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
    const allRoom = await roomModel.find({ hotel_id: req.params.id })
    console.log(allRoom)
    res.render('showroom', {
        layout: 'layouts/main',
        hotel: hotel,
        allRoom: allRoom,
        title: 'Show Room'
    });
}
module.exports = {
    showHotel,
    roomDetails,
    showRoomPage
}