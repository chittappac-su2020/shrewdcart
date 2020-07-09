const db = require("../models");
const Image = db.image;
var aws = require("aws-sdk");
const logger = require("../config/winston-logger");
const S3_BUCKET = process.env.bucket;
const statsDClient = require('statsd-client');
const sdc=new statsDClient({ host: 'localhost', port: 8125});


//Create Image
exports.insertimage = (req,res) => {

    var timer = new Date();
    sdc.increment("endpoint.insertimage.http.post");
    sdc.timing("POST insert image request timming "+timer);

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
                    sdc.timing("QUERY insert image request timming "+timer);
                })
                .catch(err => {
                    res.status(500).send('error: '+err);
                    logger.error("Error in creating the image");
                })
};

//Delete image
exports.deleteImage = (req,res) => {

    var timer = new Date();
    sdc.increment("endpoint.deleteimage.http.get");
    sdc.timing("POST delete image request timming "+timer);

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
            sdc.timing("QUERY delete image request timming "+timer);
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

    var timer = new Date();
    sdc.increment("endpoint.deletefroms3.http.get");
    sdc.timing("POST delete from s3 request timming "+timer);

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
          sdc.timing("QUERY delete from s3 request timming "+timer);
        })
        }                  // deleted
      });
}

exports.findImages = (req,res) => {

    var timer = new Date();
    sdc.increment("endpoint.findimages.http.post");
    sdc.timing("GET find images request timming "+timer);

    const bookid = req.body.bookid;

    Image.findAll({
        where:{
            bookid:bookid
        }
        })
        .then(data => {
            res.send(data);
            logger.info("Found the image successfully with the image data "+data);
            sdc.timing("QUERY find images request timming "+timer);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving books with sellername"
            });
            logger.error("Error in retrieving the books with sellername");
        });
}

exports.findAllImages = (req,res) => {

    var timer = new Date();
    sdc.increment("endpoint.finallimages.http.post");
    sdc.timing("Find all images request timing "+timer);

    Image.findAll()
    .then(data => {
        res.send(data);
        logger.info("Retrieved the images successfully with images data "+data);
        sdc.timing("QUERY find images request timming "+timer);
    })
    .catch(err => {
        logger.error("Error in retrieving the images");
        res.status(500).send({
            message : err.message
        })
    })
}

