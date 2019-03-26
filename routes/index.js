var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* GET register and login page. */
router.get('/about-us', function(req, res, next) {
  res.render('about-us', {
    title: 'About Us'
  });
});

/* GET register and login page. */
router.get('/register-login', function(req, res, next) {
  res.render('register-login', {
    title: 'User'
  });
});

module.exports = router;
