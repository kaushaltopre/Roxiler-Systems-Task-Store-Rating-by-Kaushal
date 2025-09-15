const express = require('express');
const { updatePassword, getProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/password', updatePassword);

module.exports = router;