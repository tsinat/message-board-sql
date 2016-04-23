'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

//route for message
router.get('/', (req, res) => {

    Message.findAll(function(err, messages){
        if(err){
            return res.status(400).send(err);
        }
        console.log(messages);
        res.render('message',{ messages: messages});
        // res.send();
    });
});

router.post('/', (req,res) => {
    Message.create(req.body, (err,x) => {
        if(err){
            res.send(err);
        }
        res.send(x);
    });
});

router.delete('/:id', (req,res) => {
    console.log(req.params.id);
    Message.delete(req.params.id, (err, x) => {
        if(err){
            res.send(err);
        }
        console.log(x);
        res.send(x);
    });
});

// router.put('/:id', (req, res) => {
//     Message.edit(req.params.id, err => {
//         if(err){
//             res.send(err);
//         }
//         res.send();
//     });
// });
module.exports = router;
