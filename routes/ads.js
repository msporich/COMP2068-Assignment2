var express = require('express');
var router = express.Router();

const Ad = require('../models/ad');

/* GET List Page */
router.get('/', function (req, res, next) {

    Ad.find((err, ads) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('ads/index', {
                ads: ads,
            });
        }
    })

});

/* GET Ad Creation Page */
router.get('/create', function (req, res, next) {
    res.render('ads/create')
})

/* Ad Creation Submission */
router.post('/create', function (req, res, next) {
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
            res.redirect('/ads')
        }
    }
    )
})

/* GET Ad Deletion Functionality */
router.get('/delete/:_id', function (req, res, next) {
    var _id = req.params._id;
    Ad.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/ads')
        }
    })
})

/* GET Ad Editing Functionality */
router.get('/edit/:_id', function (req, res, next) {
    var _id = req.params._id;
    Ad.findById(_id, (err, ads) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('ads/edit', {
                ads: ads,
            });
        }
    })
})

/* Ad Editing Submission */
router.post('/edit/:_id', (req, res, next) => {
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
            res.redirect('/ads')
        }
    })
})

module.exports = router;