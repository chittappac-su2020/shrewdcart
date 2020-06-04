const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const config = require('../config/auth.config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);


//Register
exports.register = (req,res) => {   
    
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };

    if(!schema.validate(userData.password)){
        res.status(500).send({message:"Your password must have min of 8 characters,one uppercase, one lowercase, have digits, not have spaces and not predictable"});
        return;
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(!user) {

            const hash = bcrypt.hashSync(userData.password,10);
            userData.password = hash;

            User.create(userData)
                .then(user => {
                    let token = jwt.sign(user.dataValues, config.secret ,{expiresIn: 1440});
                    res.json( { token:token } )
                })
                .catch(err => {
                    res.send('error: '+err)
                })

        } else {
            res.json({ error : "User already exists"});
        }
    })
    .catch(err => {
        res.send('error: '+err);
    })
}


//Login
exports.login = (req,res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {

            if(bcrypt.compareSync(req.body.password, user.password)) {

                let token = jwt.sign(user.dataValues, config.secret , {expiresIn : 1440})
                res.json({ token: token})

            } else {
                res.status(401).send({message : "Incorrect password"})
            }
        })
        .catch(err => {
            res.status(404).send({message : "User does not exist"})
        })
}


//Create and save a new User
exports.create = (req,res) => {
    //Validate request
    if (!req.body.firstname && !req.body.lastname && !req.body.email && !req.body.password) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //Create a User
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };

    //Save the user in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the User."
            });
        });
};

//Retrieve all users from the database
exports.findAll = (req,res) => {
    const firstname = req.query.title;
    var condition = firstname ? { title: {[Op.like]: `%${title}%`}} : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Users"
            });
        });
};

//Find a single User with an id
exports.findOne = (req,res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" +id
            });
        });
};


exports.findOneEmail = (req,res) => {
    const email = req.body.email;

    User.findOne({
        where:{
            email:email
        }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with email"
            });
        });
};

//Update an user by an id in the request
exports.update = (req,res) => {
    const id = req.params.id;

    if(!schema.validate(req.body.password)){
        res.status(500).send({message:"Your password must have min of 8 characters,one uppercase, one lowercase, have digits, not have spaces and not predictable "+req.body.password});
        return;
    }

    const user = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    }

    const hash = bcrypt.hashSync(user.password,10);
    user.password = hash;

    User.update(user, {
        where : {id : id}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

//Profile
exports.profile = (req,res) => {
    var decoded = jwt.verify(req.headers['Authorization'], config.secret);

    User.findOne({
        where:{
            id: decoded.id
        }
    })
        .then(user => {
            if(user) {
                res.status(200).send(user)
            }else{
                res.status(500).send("User does not exist")
            }
        })
        .catch(err => {
            res.status(500).send('error: '+err)
        })
}

