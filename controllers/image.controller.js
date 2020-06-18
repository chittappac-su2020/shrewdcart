const db = require("../models");
const Image = db.image;

//Create Image
exports.insertimage = (req,res) => {
    const data = {
        title: req.body.title,
        bookid: req.body.bookid,
        sellername: req.body.sellername
    };

    Image.create(data)
                .then(image => {
                    res.json( { image:image } )
                })
                .catch(err => {
                    res.status(500).send('error: '+err)
                })
};

//Delete image
exports.deleteImage = (req,res) => {

    const id = req.body.id;

    Image.destroy({
        where : {id : id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message : "Book was deleted successfully!"
            });
        }else{
            res.status(500).send({
                message : `Cannot delete Book with id=${id}. Maybe book was not found`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete Book with id= "+id
        });
    });

}

exports.findImages = (req,res) => {

    const bookid = req.body.bookid;

    Image.findAll({
        where:{
            bookid:bookid
        }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving books with sellername"
            });
        });
}

exports.findAllImages = (req,res) => {

    Image.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message
        })
    })
}

