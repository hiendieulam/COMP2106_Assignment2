var express = require('express');
var router = express.Router();
const Video = require('../models/videos');

/* GET users listing. */
router.get('/', (req, res, next) => {
	Video.find({}).then(videos => {
		res.render('share-cooking', {
			title: 'Share Cooking',
			videos: videos
        });
    });
});


/* GET request for the add a food. */
router.get('/add', (req, res, next) => {
	res.render('add-Video', {
		title: 'Add a Video'
});
});

/* POST request for the add a food. */
router.post('/add', (req, res, next) => {
	const addVideo = new Video(req.body);
	addVideo.save().then(() => {
		res.redirect('/share-cooking');
	});
});

/* GET request for deleting an user. */
router.get('/delete/:id', (req, res, next) => {
	Video.findByIdAndDelete(req.params.id).then(() => {
		res.redirect('/share-cooking');
	});
});

module.exports = router;