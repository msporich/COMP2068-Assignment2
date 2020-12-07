//Mark Sporich, Student #200399323
//Website: Classified Ads

var express = require('express');
var router = express.Router();

const Ad = require('../models/ad');

const passport = require('passport');

//Authentication Function
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

/* GET User Only List Page */
router.get('/', function (req, res, next) {

    Ad.find((err, ads) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('ads/index', {
                ads: ads,
                user: req.user
            });
        }
    })

});

/* GET Public Read Only List Page */
router.get('/private-index', isLoggedIn, function (req, res, next) {

    Ad.find((err, ads) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('ads/private-index', {
                ads: ads,
                user: req.user
            });
        }
    })

});

/* GET Ad Creation Page */
router.get('/create', isLoggedIn, function (req, res, next) {
    res.render('ads/create', { user: req.user })
})

/* Ad Creation Submission */
router.post('/create', isLoggedIn, function (req, res, next) {
    Ad.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }, (err, ad) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/ads/private-index')
        }
    }
    )
})

/* GET Ad Deletion Functionality */
router.get('/delete/:_id', isLoggedIn, function (req, res, next) {
    var _id = req.params._id;
    Ad.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/ads/private-index')
        }
    })
})

/* GET Ad Editing Functionality */
router.get('/edit/:_id', isLoggedIn, function (req, res, next) {
    var _id = req.params._id;
    Ad.findById(_id, (err, ads) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('ads/edit', {
                ads: ads,
                user: req.user
            });
        }
    })
})

/* Ad Editing Submission */
router.post('/edit/:_id', isLoggedIn, (req, res, next) => {
    var _id = req.params._id;
    var ad = new Ad({
        _id: _id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })
    Ad.update({ _id: _id }, ad, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/ads/private-index')
        }
    })
})

module.exports = router;