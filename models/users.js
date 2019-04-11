var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema ({
	username: String, 
	email: String, 
    password: String,
    address: String,
    postal: String,
    city: String,
    country: String,
    phone: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);