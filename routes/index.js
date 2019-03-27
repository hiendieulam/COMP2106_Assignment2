var express = require('express');
var router = express.Router();
const Carousel = require('../models/carousels');
const User = require('../models/users');


/* GET home page. */
router.get('/', function(req, res, next) {
  // Carousel.find({}).then(carousles => {
  //   carousles = carousles;

  // // console.log(carousles);
  // });
  // console.log(carousles);
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

/* POST request for the add an user. */
router.post('/register-login', (req, res, next) => {
  const addUser = new User(req.body);
  console.log(addUser);
  addUser.save().then(() => {
    res.redirect('/users');
  });
});

module.exports = router;
