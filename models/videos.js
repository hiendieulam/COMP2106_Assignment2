var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Video = new Schema ({
	title: String, 
	url: String, 
    description: String,
    image: String
});

module.exports = mongoose.model('Video', Video);