const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message: 'Handling GET requests to /cards'
    });
});

router.post('/',(req,res,next) => {
    res.status(200).json({
        message: 'Handling POST requests to /cards'
    });
});

router.get('/:cardsId',(req,res,next) => {
    const id = req.params.cardsId;
    if (id === 'special') {
        res.status(200).json({
            message : 'This is a GET request for /cards/{specialid}',
            id : id
        });
    } else {
        res.status(200).json({
            message : 'This is a GET request for /cards/{id}'
        });
    }
});

router.patch('/:cardsId',(req,res,next) => {
   res.status(200).json({
        message : 'Updated card!'
   });
});

router.delete('/:cardsId',(req,res,next) => {
    res.status(200).json({
         message : 'Deleted card!'
    });
 });


module.exports = router;