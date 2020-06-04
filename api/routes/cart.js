const express = require('express');
const router = express.Router();

const carts = require('../../controllers/cart.controller.js');

const Cart = require('../../models/cart.model.js');

//Insert Cart
router.post('/insert',carts.insertcart);

//Retrieve all carts
router.post('/findall',carts.findAllCarts);

//Find existing
router.post('/findone',carts.findExisting);

router.post('/update',carts.updateCart)

module.exports = router;


