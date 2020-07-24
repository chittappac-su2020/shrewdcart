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
const aws = require('aws-sdk');
const uuidv4 = require('uuid/v4');

var sns = new aws.SNS({});
var sqs = new aws.SQS({apiVersion: '2012-11-05'});

exports.resetPassword = (req,res) => {

    var email = req.body.email;

    let payload = {
            Email : email
    }

    payload = JSON.stringify(payload);

    let params = {
        Message : email,
        TopicArn : process.env.TopicArn
    }

    sns.publish(params, (err,data) => {
        if(err){
            logger.error("Email for ::"+email+"was not successfull ::"+err);
            res.status(501).send({
                message : "Error in sending the email " + err + process.env.TopicArn
            })
        }else{
            logger.error("Email for ::"+email+"sent successfully");
            res.status(200).send({
                message : "Email sent successfully"
            })
        }
    }) 
}