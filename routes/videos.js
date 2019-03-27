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

module.exports = router;