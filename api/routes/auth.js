const { verifySignUp } = require('../../middlewares');
const controller = require('../../controllers/auth.controller');
const express = require('express');
const router = express.Router();

const auth = require('../../controllers/auth.controller.js');

router.post('/signup', auth.signup);

module.exports = router;