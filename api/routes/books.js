const express = require('express');
const router = express.Router();

const books = require('../../controllers/book.controller.js');

const Book = require('../../models/book.model.js');

//Insert Book
router.post('/insert',books.insertbook);

//Retrieve all books with email
router.post('/findbooks',books.findAllBooks);

//Retrieve books of other sellers
router.post('/othersellerlisting',books.findOBooks);

//Update the book with sellername
router.post('/update',books.updateBooks);

//Delete a book with id
router.post('/delete',books.deleteBook);

//Find all books
router.post('/findall',books.findAllBooks);

//findbyisbn
router.post('/isbn',books.findByIsbn)

module.exports = router;