const hotelModel = require('../models/hotelModel')


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
const showRoomPage = (req, res) => {
    res.render('showroom', {
        layout: 'layouts/main'
    });
}
module.exports = {
    showHotel,
    roomDetails,
    showRoomPage
}