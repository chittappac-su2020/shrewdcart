const db = require("../models");
const Author = db.author;
const Op = db.Sequelize.Op;

//Create Book
exports.insertauthor = (req,res) => {
    const authorData = {
        bookid:req.body.bookid,
        authorname:req.body.authorname
    };

    Author.create(authorData)
                .then(author => {
                    res.json( { author:author } )
                })
                .catch(err => {
                    res.status(500).send('error: '+err)
                })
};
