const paymentPage = (req, res) => {

    res.render('payment', {
        layout: 'layouts/main'
    });
}


module.exports = {
    paymentPage
}