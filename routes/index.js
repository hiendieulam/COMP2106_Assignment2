var express = require('express');
var router = express.Router();
const Home = require('../models/homes');
const Carousel = require('../models/carousels');
const Product = require('../models/products');
const User = require('../models/users');
var passport = require('passport');


/* GET home page. */
router.get('/', async function(req, res, next) {
  await Home.findOne({_id: '5c9fcc858f5a354fdf4a63ab'}).populate('carousel').populate('bestSellers').
  exec(function (err, home) {
    if (err) return handleError(err);
    console.log(home.carousel);
    res.render('index', {
      title: 'Home',
      home
    });
  });
});

/* GET about-us page. */
router.get('/about-us', function(req, res, next) {
  res.render('about-us', {
    title: 'About Us'
  });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register'
  });
});

/* POST request for the add an user. */
router.post('/register', function(req, res) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render('register', { user: user, error: err.message });
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/users');
      });
    }
  );
});

// Handle Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: 'There was an error'
  })
);

// Handle Logout
router.get('/logout', function(req, res) {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/login');
  });
  // req.logout();
});
module.exports = router;
