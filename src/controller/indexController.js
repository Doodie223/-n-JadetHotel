const userModel = require("../models/userModel")

const Homepage = (req, res) => {
    res.render('index', {
        layout: 'layouts/main'
    });
}

const About = (req, res) => {
    res.render('about', {
        layout: 'layouts/main'
    });
}

const LoginPage = (req, res) => {
    res.render('auth/login', {
        layout: 'layouts/main'
    });
}

const Login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            console.log("email:", req.body.email)
            res.render('auth/login', {
                layout: 'layouts/main',
                error: 'Please provide email and password.'
            });
            return
        } else {
            let user = await userModel.findOne({ email: req.body.email })
            console.log("User: ", user)
            if (!user) {
                return res.render('auth/login', {
                    layout: 'layouts/main',
                    error: 'Not found user, please register!!! '
                });
            }
            if (user.password === req.body.password) {
                console.log("Login successfull")
                return res.render('index', {
                    layout: 'layouts/main'
                });
            }
            return res.render('auth/login', {
                layout: 'layouts/main',
                error: 'Login fail, wrong password, please check !!! '
            });
        }
    } catch (error) {
        console.log("Error login with post method: ", error);
        return res.render('login', { error: 'An error occurred while logging in.' });
    }
}




module.exports = {
    Homepage,
    About,
    LoginPage,
    Login
}