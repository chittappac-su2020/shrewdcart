const db = require("../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;
const config = require('../config/auth.config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var passwordValidator = require('password-validator');
const Sequelize = require("sequelize");

//Insert Cart
exports.insertcart = (req,res) => {
    const cartData = {
        title: req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        sellerid: req.body.sellerid,
        buyerid: req.body.buyerid,
        bookid: req.body.bookid
    };

    Cart.create(cartData)
                .then(book => {
                    res.json( { book:book } )
                })
                .catch(err => {
                    res.status(500).send('error: '+err)
                })
};

//Retrieve all carts
exports.findAllCarts = (req,res) => {

    Cart.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message
        })
    })
}

//Check if already the item is present
exports.findExisting = (req,res) => {

    const title = req.body.title;

    Cart.findOne({
        where:{
            title:title
        }
    })
        .then(user => {
            if(user) {
                res.status(200).send(user)
            }else{
                res.status(500).send("Item does not exist")
            }
        })
        .catch(err => {
            res.status(500).send('error: '+err)
        })
}

//Update cart
exports.updateCart = (req,res) => {

    const cart = {
        title:req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        sellerid: req.body.sellerid,
        buyerid: req.body.buyerid,
        bookid: req.body.bookid
    }

    Cart.update(cart, {
        where : {bookid : cart.bookid}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Cart was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cart with id=${cart.bookid}. Maybe Book was not found or req.body is empty`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with sellername=" + cart.bookid
            });
        });

}
