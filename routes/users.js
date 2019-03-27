var express = require('express');
var router = express.Router();
const User = require('../models/users');

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
router.get('/add-user', function(req, res, next) {
  res.render('add-user', {
    title: 'Add User'
  });
});

/* POST request for the add an user. */
router.post('/add-user', (req, res, next) => {
  const addUser = new User(req.body);
  addUser.save().then(() => {
    res.redirect('/users');
  });
});

/* GET request for an user. */
router.get('/edit-user/:id', (req, res, next) => {
  User.findById(req.params.id).then(requestUser => {
    res.render('edit-user', {
      title: 'Edit User',
      user: requestUser
    });
  });
});

/* POST request for the update the user. */
router.post('/edit-user/:id', (req, res, next) => {
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
