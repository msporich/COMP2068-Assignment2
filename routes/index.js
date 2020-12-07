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

/* POST Registration */
router.post('/register', function (req, res, next) {
    
})

/* GET Login Page */
router.get('/login', function (req, res, next) {
    res.render('login');
});

module.exports = router;
