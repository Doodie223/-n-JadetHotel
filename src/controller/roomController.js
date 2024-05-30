const showRoom = (req, res) => {
    res.render('showroom', {
        layout: 'layouts/main'
    });
}

const roomDetails = (req, res) => {
    res.render('roomdetail', {
        layout: 'layouts/main'
    });
}
module.exports = {
    showRoom,
    roomDetails
}