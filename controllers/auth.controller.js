const db = require('../models');
const config = require('../config/auth.config.js');
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
// Save User to Database
User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstname: req.body.firstname,
    lastname: req.body.lastname
})
    .then(user => {
    if (req.body.email) {
        User.findAll({
        where: {
            email: {
            [Op.or]: req.body.email
            }
        }
        }).then(() => {
            res.status(400).send({ message: "User exists! Please try Sign in"});
        });
    } else {
        
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

    }
    })
    .catch(err => {
    res.status(500).send({ message: err.message });
    });
};


