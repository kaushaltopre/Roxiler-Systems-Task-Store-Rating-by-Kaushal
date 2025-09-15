const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateUserInput } = require('../middlewares/validations');

const router = express.Router();

router.post('/register', validateUserInput, register);
router.post('/login', login);

module.exports = router;