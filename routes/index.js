var express = require('express');
var router = express.Router();

const passport = require('passport');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

/* GET Registration Page */
router.get('/register', function (req, res, next) {
    res.render('register');
});

/* POST Registration */
router.post('/register', function (req, res, next) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            req.login(user, (err) => {
                res.redirect('/ads');
            })
        }
    })
})

/* GET Login Page */
router.get('/login', function (req, res, next) {
    //pass invalid login message if received
    let messages = req.session.messages || []

    req.session.messages = []
    
    res.render('login', {
        messages: messages
    });
});

/* POST Login */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/ads',
    failureRedirect: '/login',
    failureMessage: 'Login invalid. Please try again.'
}))

/* GET Logout Functionality */
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/login');
})

module.exports = router;
