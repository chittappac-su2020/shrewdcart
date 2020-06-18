var aws = require('aws-sdk'); 
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-1', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
  signatureVersion:"v4"
})


// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req,res) => {
  const s3 = new aws.S3();  // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  const S3_BUCKET = process.env.bucket
// Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };

    if(err){
      console.log(err);
      res.json({success: false, error: err})
    }else{
      res.json({success:true, data:{returnData}});
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 

    // Send it all back
  });
}

exports.downloadFile= (req,res)=>{
        let s3_filename= req.body.image   
        const s3Client = new aws.S3({
        accessKeyId:process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
        region : 'us-east-1',
        signatureVersion:"v4"
        });
        const downloadParams = {
                Bucket: process.env.bucket, 
                Key: '' // pass key
        };
        const params = downloadParams;
        
        params.Key = s3_filename;
        
        s3Client.getObject(params, function(error, data) {
        console.log(data.Body)
        var img = data.Body.toString('base64');
        res.status(200);
        res.json({
        img
        })
    })
}

