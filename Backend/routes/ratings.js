const express = require('express');
const { submitRating, getUserRatings } = require('../controllers/ratingController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/', submitRating);
router.get('/my-ratings', getUserRatings);

module.exports = router;