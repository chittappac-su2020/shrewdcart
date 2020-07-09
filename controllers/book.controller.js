const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;
const config = require('../config/auth.config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var passwordValidator = require('password-validator');
const Sequelize = require("sequelize");
const logger = require("../config/winston-logger");
const statsDClient = require('statsd-client');
const sdc=new statsDClient({ host: 'localhost', port: 8125});

//Create Book
exports.insertbook = (req,res) => {

sdc.increment("endpoint.bookinsert.http.post");

    const bookData = {
        ISBN: req.body.isbn,
        title: req.body.title,
        publicationdate: req.body.publicationdate,
        quantity: req.body.quantity,
        price: req.body.price,
        sellername: req.body.sellername
    };

    Book.create(bookData)
                .then(book => {
                    res.json( { book:book } )
                    logger.info('Created the book successfully with the book name '+bookData.title);
                })
                .catch(err => {
                    res.status(500).send('error: '+err)
                    logger.error('Error while creating the book');
                })
};


//Retrieve all books by seller name
exports.findAllBooks = (req,res) => {

    sdc.increment("endpoint.bookfind.http.get");

    const email = req.body.email;

    Book.findAll({
        where:{
            sellername:email
        }
        })
        .then(data => {
            res.send(data);
            logger.info("Succesfully searched the book with the details "+data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving books with sellername"
            });
            logger.error("Error while finding all the books");
        });
};

//Retrieve all books
exports.findAllBooks = (req,res) => {

    sdc.increment("endpoint.findallbooks.http.post");

    Book.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message
        })
    })
}

//Retrieve all books by other sellers
exports.findOBooks = (req,res) => {

    sdc.increment("endpoint.findothersellerbooks.http.get");

    const email = req.body.email;

    Book.findAll({
        where:{
            sellername:{[Sequelize.Op.not]: email}
        }
        })
        .then(data => {
            res.send(data);
            logger.info("Successfully retrieved the books with the current user");
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving books with sellername"
            });
            logger.error("Error in retrieving the books with the current user");
        });
}

//Updating a book by the seller
exports.updateBooks = (req,res) => {

    sdc.increment("endpoint.updatebook.http.post");
    
    const book = {
        id:req.body.id,
        ISBN: req.body.isbn,
        title: req.body.title,
        publicationdate: req.body.publicationdate,
        quantity: req.body.quantity,
        price: req.body.price,
        sellername: req.body.sellername
    }

    Book.update(book, {
        where : {id : book.id}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Book was updated successfully."
                });
                logger.info("Updated the book successfully");
            } else {
                res.send({
                    message: `Cannot update Book with id=${book.id}. Maybe Book was not found or req.body is empty`
                });
                logger.error("Error in updating the book");
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with sellername=" + book.id
            });
        });
}

//Delete a book with id
exports.deleteBook = (req,res) => {

    sdc.increment("endpoint.deletebook.http.post");

    const id = req.body.id;

    Book.destroy({
        where : {id : id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message : "Book was deleted successfully!"
            });
            logger.info("The book was deleted successfully");
        }else{
            res.status(500).send({
                message : `Cannot delete Book with id=${id}. Maybe book was not found`
            })
            logger.error("Error in deleting the book");
        }
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete Book with id= "+id
        });
    });

}

//Find a book by isbn
exports.findByIsbn = (req,res) => {

    sdc.increment("endpoint.findbookbyisbn.http.post");

    Book.findOne({
        where: {
            ISBN: req.body.isbn
        }
    })
    .then(book => {
        res.send(book);
        logger.info("The book was found successfully");
    })
    .catch(err => {
        res.status(500).send('error: '+err);
        logger.error("The book wasn't found successfully");
    })
}






