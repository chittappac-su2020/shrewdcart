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

    var timer = new Date();
    sdc.increment("endpoint.cartinsert.http.post");
    sdc.timing("POST insert cart request timming "+timer);

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
                    sdc.timing("QUERY insert cart request timming "+timer);
                })
                .catch(err => {
                    res.status(500).send('error: '+err)
                    logger.error("Error in adding an item to the cart");
                })
};

//Retrieve all carts
exports.findAllCarts = (req,res) => {

    var timer = new Date();
    sdc.increment("endpoint.findallcarts.http.get");
    sdc.timing("GET find all the items in the cart request timming "+timer);

    Cart.findAll()
    .then(data => {
        res.send(data);
        logger.info("Successfully retrieved all the items in the cart with cart data "+data);
        sdc.timing("QUERY find all the items in the cart request timming "+timer);
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

    var timer = new Date();
    sdc.increment("endpoint.finditemcart.http.post");
    sdc.timing("GET checking if the item is present in the cart request timming "+timer);

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
                sdc.timing("QUERY checking if the item is present in the cart request timming "+timer);
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

    var timer = new Date();
    sdc.increment("endpoint.updatecart.http.post");
    sdc.timing("PUT update cart request timming "+timer);

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
                sdc.timing("QUERY update cart request timming "+timer);
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

    var timer = new Date();
    sdc.increment("endpoint.deletecart.http.post");
    sdc.timing("POST delete cart request timming "+timer);

    const title = req.body.title;

    Cart.destroy({
        where : {title : title}
    })
    .then(num => {
        res.send({
            message : "Cart was deleted successfully!"
        });
        logger.info("Cart was deleted successfully!");
        sdc.timing("QUERY delete cart request timming "+timer);
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete Book with title= "+title
        });
        logger.error("Error in deleting the cart");
    });

}
