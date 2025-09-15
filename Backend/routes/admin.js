const express = require('express');
const { getDashboard, createUser, createStore, getUsers, getStores } = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { validateUserInput } = require('../middlewares/validations');

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['admin']));

router.get('/dashboard', getDashboard);
router.post('/users', validateUserInput, createUser);
router.post('/stores', createStore);
router.get('/users', getUsers);
router.get('/stores', getStores);

module.exports = router;