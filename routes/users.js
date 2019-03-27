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

module.exports = router;
