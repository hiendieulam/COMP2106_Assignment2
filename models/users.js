var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = new Schema ({
	name: String, 
	email: String, 
    password: String,
    address: String,
    postal: String,
    city: String,
    country: String,
    phone: String
});

module.exports = mongoose.model('User', User);