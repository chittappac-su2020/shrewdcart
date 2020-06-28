const express = require('express');
const router = express.Router();

const image = require('../../controllers/bucket.controller.js');
const img = require('../../controllers/image.controller.js');

router.post('/sign_s3',image.sign_s3);

router.post('/download',image.downloadFile);

router.post('/insert',img.insertimage);

router.post('/delete',img.deleteImage);

router.post('/find',img.findAllImages);

router.post('/deletefroms3',img.deleteFromS3);

module.exports = router;