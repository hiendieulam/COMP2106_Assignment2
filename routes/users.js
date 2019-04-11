var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).then(users => {
    res.render('users', {
      title: 'Users',
      users: users
    });
  });
});


/* GET add user page. */
router.get('/add', function(req, res, next) {
  res.render('add-user', {
    title: 'Add User'
  });
});

/* POST request for the add an user. */
router.post('/add', function(req, res) {
  User.register(
    new User({username: req.body.username, email: req.body.email, address: req.body.address, postal: req.body.postal, city: req.body.city, country: req.body.country, phone: req.body.phone }),
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

/* GET request for an user. */
router.get('/edit/:id', (req, res, next) => {
  User.findById(req.params.id).then(requestUser => {
    res.render('edit-user', {
      title: 'Edit User',
      user: requestUser
    });
  });
});

/* POST request for the update the user. */
router.post('/edit/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(() => {
    res.redirect('/users');
  });
});

/* GET request for deleting an user. */
router.get('/delete/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id).then(() => {
      res.redirect('/users');
  });
});

module.exports = router;
