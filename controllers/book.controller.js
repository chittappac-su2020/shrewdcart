const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;
const config = require('../config/auth.config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var passwordValidator = require('password-validator');
const Sequelize = require("sequelize");


//Create Book
exports.insertbook = (req,res) => {
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
                })
                .catch(err => {
                    res.status(500).send('error: '+err)
                })
};


//Retrieve all books by seller name
exports.findAllBooks = (req,res) => {
    const email = req.body.email;

    Book.findAll({
        where:{
            sellername:email
        }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving books with sellername"
            });
        });
};

//Retrieve all books
exports.findAllBooks = (req,res) => {

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

    const email = req.body.email;

    Book.findAll({
        where:{
            sellername:{[Sequelize.Op.not]: email}
        }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving books with sellername"
            });
        });

}

//Updating a book by the seller
exports.updateBooks = (req,res) => {
    
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
            } else {
                res.send({
                    message: `Cannot update Book with id=${book.id}. Maybe Book was not found or req.body is empty`
                });
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

    const id = req.body.id;

    Book.destroy({
        where : {id : id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message : "Book was deleted successfully!"
            });
        }else{
            res.status(500).send({
                message : `Cannot delete Book with id=${id}. Maybe book was not found`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete Book with id= "+id
        });
    });

}


