const db = require('../models');
const config = require('../config/auth.config.js');
const User = db.user;
const logger = require('../config/winston-logger');
const statsDClient = require('statsd-client');
const sdc=new statsDClient({ host: 'localhost', port: 8125});

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
// Save User to Database 
// This command is to create a row in the database
var timer = new Date();

//Metrics on API usage
sdc.increment("endpoint.signuppage.http.post");
sdc.timing("POST signup time "+timer);

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
            logger.error("User already exists");
            sdc.timing("QUERY find all users query timming "+timer);
        });
    } else {
        logger.info("Trying to create a new user");
        User.create(user)
        .then(data => {
            res.send(data);
            sdc.timing("QUERY create user timming "+timer);
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


