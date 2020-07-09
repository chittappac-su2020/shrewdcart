const db = require("../models");
const Author = db.author;
const Op = db.Sequelize.Op;
const logger = require("../config/winston-logger");
const statsDClient = require('statsd-client');
const sdc=new statsDClient({ host: 'localhost', port: 8125});

//Create Book
exports.insertauthor = (req,res) => {

    var timer = new Date();

    //metric for API usage
    sdc.increment("endpoint.authorinsert.http.post");
    sdc.timing("GET author creation time "+timer);

    const authorData = {
        bookid:req.body.bookid,
        authorname:req.body.authorname
    };

    Author.create(authorData)
                .then(author => {
                    res.json( { author:author } )
                    sdc.timing("QUERY create author timming "+timer);
                })
                .catch(err => {
                    res.status(500).send('error: '+err)
                    logger.error("Error while creating the author");
                })
};

//Find all authors
exports.findAllAuthors = (req,res) => {
    var timmer = new Date();

    sdc.increment("endpoint.authorfindall.http.post");
    sdc.timing("POST find authors timing "+timmer)

    Author.findAll()
    .then(data => {
        res.send(data);
        sdc.timing("QUERY find all authors timming "+timmer);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message
        })
    })
}
