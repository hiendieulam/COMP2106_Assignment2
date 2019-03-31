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

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/users');
});

// Github
router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res, next) => {
    console.log('Logged In Successfully');
    res.redirect('/users');
    // res.send('Github Callback');
  }
);


module.exports = router;
