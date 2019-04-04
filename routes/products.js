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
router.get('/add', (req, res, next) => {
		res.render('add-food', {
			title: 'Add a food'
    });
});

/* POST request for the add a food. */
router.post('/add', (req, res, next) => {
	const addFood = new Product(req.body);
	addFood.save().then(() => {
		res.redirect('/all-foods');
	});
});

/* GET request for deleting an user. */
router.get('/delete/:id', (req, res, next) => {
	Product.findByIdAndDelete(req.params.id).then(() => {
		res.redirect('/products');
	});
});
module.exports = router;