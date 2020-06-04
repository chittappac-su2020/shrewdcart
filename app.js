const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");

const cardRoutes = require('./api/routes/cards');
const userRoutes = require('./api/routes/users');
const authRoutes = require('./api/routes/auth');
const bookRoutes = require('./api/routes/books');
const authorRoutes = require('./api/routes/author');
const cartRoutes = require('./api/routes/cart');

const db = require("./models");

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

db.sequelize.sync();

//Routes which should handle requests
app.use('/cards',cardRoutes);
app.use('/users',userRoutes);
app.use('/auth',authRoutes);
app.use('/books',bookRoutes);
app.use('/author',authorRoutes)
app.use('/cart',cartRoutes)

//Handling all other requests
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message 
        }
    });
});

module.exports = app;

