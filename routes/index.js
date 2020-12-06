var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Registration Page */
router.get('/register', function (req, res, next) {
    res.render('register');
});

/* GET Login Page */
router.get('/login', function (req, res, next) {
    res.render('login');
});

/* GET List Page */
router.get('/list', function (req, res, next) {
    res.render('list');
});

module.exports = router;
