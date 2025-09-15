const express = require('express');
const { getAllStores, getStoreRatings } = require('../controllers/storeController');
const { authenticateToken, requireRole } = require('../middlewares/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllStores);
router.get('/my-store', requireRole(['store_owner']), getStoreRatings);

module.exports = router;