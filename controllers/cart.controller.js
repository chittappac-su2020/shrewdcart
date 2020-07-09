const db = require("../models");
const Cart = db.cart;
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

//Insert Cart
exports.insertcart = (req,res) => {

    sdc.increment("endpoint.cartinsert.http.post");

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
                    logger.info("Successfully inserted data to the cart");
                })
                .catch(err => {
                    res.status(500).send('error: '+err)
                    logger.error("Error in adding an item to the cart");
                })
};

//Retrieve all carts
exports.findAllCarts = (req,res) => {

    sdc.increment("endpoint.findallcarts.http.get");

    Cart.findAll()
    .then(data => {
        res.send(data);
        logger.info("Successfully retrieved all the items in the cart with cart data "+data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message
        });
        logger.error("Error in retrieving the items from the cart");
    })
}

//Check if already the item is present
exports.findExisting = (req,res) => {

    sdc.increment("endpoint.finditemcart.http.post");

    const title = req.body.title;

    Cart.findOne({
        where:{
            title:title
        }
    })
        .then(user => {
            if(user) {
                res.status(200).send(user);
                logger.info("Successfully retrieved the searched item from the cart with cart data "+user);
            }else{
                res.status(500).send("Item does not exist")
                logger.error("Error in retrieving the searched item from the cart");
            }
        })
        .catch(err => {
            res.status(500).send('error: '+err)
        })
}

//Update cart
exports.updateCart = (req,res) => {

    sdc.increment("endpoint.updatecart.http.post");

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
                logger.info("Updated the cart successfully!");
            } else {
                res.send({
                    message: `Cannot update Cart with id=${cart.bookid}. Maybe Book was not found or req.body is empty`
                });
                logger.error("Error in updating the cart");
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with sellername=" + cart.bookid
            });
        });

}

//Delete Cart
exports.deleteCart = (req,res) => {

    sdc.increment("endpoint.deletecart.http.post");

    const title = req.body.title;

    Cart.destroy({
        where : {title : title}
    })
    .then(num => {
        res.send({
            message : "Cart was deleted successfully!"
        });
        logger.info("Cart was deleted successfully!");
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete Book with title= "+title
        });
        logger.error("Error in deleting the cart");
    });

}
