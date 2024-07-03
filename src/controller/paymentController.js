const paymentPage = (req, res) => {
    console.log("Room data received:", req.session.roomData); // Log room data
    res.render('payment', {
        layout: 'layouts/main',
        room: req.session.roomData // Assuming roomData is stored in session
    });
};


const bookRoom = (req, res) => {
    req.session.roomData = req.body; // Store room data in session
    console.log('Room data received:', req.body); // Log room data to console
    res.json({ success: true });
};

module.exports = {
    paymentPage,
    bookRoom
};