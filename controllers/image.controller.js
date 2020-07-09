const db = require("../models");
const Image = db.image;
var aws = require("aws-sdk");
const logger = require("../config/winston-logger");
const S3_BUCKET = process.env.bucket;
const statsDClient = require('statsd-client');
const sdc=new statsDClient({ host: 'localhost', port: 8125});


//Create Image
exports.insertimage = (req,res) => {

    sdc.increment("endpoint.insertimage.http.post");

    const data = {
        title: req.body.title,
        bookid: req.body.bookid,
        sellername: req.body.sellername
    };

    Image.create(data)
                .then(image => {
                    console.log("mychack "+ image)
                    res.json( { image:image } )
                    logger.info("Image was created successfully");
                })
                .catch(err => {
                    res.status(500).send('error: '+err);
                    logger.error("Error in creating the image");
                })
};

//Delete image
exports.deleteImage = (req,res) => {

    sdc.increment("endpoint.deleteimage.http.get");

    const id = req.body.id;

    Image.destroy({
        where : {id : id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message : "Book was deleted successfully!"
            });
            logger.info("Image was deleted successfully");
        }else{
            res.status(500).send({
                message : `Cannot delete Book with id=${id}. Maybe book was not found`
            })
            logger.error("Errror in deleting the Image");
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

    sdc.increment("endpoint.deletefroms3.http.get");

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
          logger.info("Deleted the image successfully");
        })
        }                  // deleted
      });
}

exports.findImages = (req,res) => {

    sdc.increment("endpoint.findimages.http.post");

    const bookid = req.body.bookid;

    Image.findAll({
        where:{
            bookid:bookid
        }
        })
        .then(data => {
            res.send(data);
            logger.info("Found the image successfully with the image data "+data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving books with sellername"
            });
            logger.error("Error in retrieving the books with sellername");
        });
}

exports.findAllImages = (req,res) => {

    sdc.increment("endpoint.finallimages.http.post");

    Image.findAll()
    .then(data => {
        res.send(data);
        logger.info("Retrieved the images successfully with images data "+data);
    })
    .catch(err => {
        logger.error("Error in retrieving the images");
        res.status(500).send({
            message : err.message
        })
    })
}

