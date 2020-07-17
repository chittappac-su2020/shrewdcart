const express = require('express');
const router = express.Router();

const users = require('../../controllers/user.controller.js');

const User = require('../../models/user.model.js');

//Register
router.post('/register',users.register);

//Login
router.post('/login',users.login)

//Create a new User
router.post('/', users.create);

//Retrieve all Users
router.get('/', users.findAll);

//Retrieve single User
router.post('/find', users.findOneEmail);

//Update an User with id
router.put('/:id', users.update);

//Profile
router.post('/profile',users.profile);

//logout
router.get('/logout',users.logout);

module.exports = router;