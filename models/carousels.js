var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Carousel = new Schema ({
	title: String, 
	image: String, 
    description: String,
    targetURL: String
});

module.exports = mongoose.model('Carousel', Carousel);