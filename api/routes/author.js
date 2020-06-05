const express = require('express');
const router = express.Router();

const author = require('../../controllers/author.conroller.js');

const Author = require('../../models/authors.model.js');

//Insert Book
router.post('/insert',author.insertauthor);

//Retrieve all books
router.post('/findall',author.findAllAuthors);

module.exports = router;