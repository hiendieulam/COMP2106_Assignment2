var express = require('express');
var router = express.Router();
const Product = require('../models/products');

/* GET users listing. */
router.get('/', (req, res, next) => {
	Product.find({}).then(products => {
		res.render('all-foods', {
			title: 'All Foods',
			products: products
        });
    });
});

module.exports = router;