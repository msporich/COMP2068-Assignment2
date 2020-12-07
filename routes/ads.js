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

module.exports = router;