const orderPage = (req, res) => {
    res.render('order', {
        layout: 'layouts/main'
    });
}

module.exports = {
    orderPage
}
