const express = require('express');
const router = express.Router();

const service = require('../../controllers/service.controller');

router.post('/',service.resetPassword);

module.exports = router;



