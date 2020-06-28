const db = require("../models");
const Image = db.image;
var aws = require("aws-sdk");
const S3_BUCKET = process.env.bucket;


//Create Image
exports.insertimage = (req,res) => {
    const data = {
        title: req.body.title,
        bookid: req.body.bookid,
        sellername: req.body.sellername
    };

    Image.create(data)
                .then(image => {
                    console.log("mychack "+ image)
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

//Delete image from amazon s3
exports.deleteFromS3 = (req,res) => {
    var s3 = new aws.S3({
      accessKeyId:process.env.AWSAccessKeyId,
      secretAccessKey: process.env.AWSSecretKey,
      region : 'us-east-1',
      signatureVersion:"v4"
    });
      var params = {  Bucket: S3_BUCKET, Key: req.body.imagename };
      

      s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else{
        Image.destroy({where : {title : req.body.imagename}})
        .then((data)=>{
          res.status(200);
          res.json({
            msg:" image deleted Successfully"
          })
        })
        }                  // deleted
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

