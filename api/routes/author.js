const express = require('express');
const router = express.Router();

const author = require('../../controllers/author.conroller.js');

const Author = require('../../models/authors.model.js');

//Insert Book
router.post('/insert',author.insertauthor);

module.exports = router;