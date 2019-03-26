var express = require('express');
var router = express.Router();
// const Product = require('../models/products');

/* GET users listing. */
router.get('/', (req, res, next) => {
	// Product.find({}).then(products => {
		res.render('share-cooking', {
			title: 'Share Cooking'
        });
    // });
});

module.exports = router;