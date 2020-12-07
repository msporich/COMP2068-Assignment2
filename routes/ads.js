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

/* GET Ad Deletion Page */
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

module.exports = router;