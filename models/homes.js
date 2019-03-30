var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const Home = new Schema ({
	carousel: [{ type: Schema.Types.ObjectId, ref: 'Carousel' }], 
	bestSellers: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Home', Home);