'use strict';

const PORT = process.env.PORT || 3000;
//requires: loading libraries

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid');
var Messages = require('./models/message');


var app = express();

//general purpose middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'jade');

app.get('/', (req, res, next) =>{
    res.render('index');
});

//route to our messages
app.use('/message', require('./routes/messages'));

app.use((req, res, next) => {
    res.status(404).send('The file that you are looking for does not exist');
})

//create server, and listen to PORT
app.listen(PORT, err =>{
    console.log(err || `server listening on port ${PORT}`);
})
