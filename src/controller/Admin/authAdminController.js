const LoginPage = (req, res) => {
    res.render('admin/adminLogin', {
        layout: 'layouts/ADMIN'
    });
}

module.exports = {
    LoginPage
}