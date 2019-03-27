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

/* GET request for the add a food. */
router.get('/add-food', (req, res, next) => {
		res.render('add-food', {
			title: 'Add a food'
    });
});

/* POST request for the add a food. */
router.post('/add-food', (req, res, next) => {
	const addFood = new Product(req.body);
	addFood.save().then(() => {
		res.redirect('/all-foods');
	});
});
module.exports = router;