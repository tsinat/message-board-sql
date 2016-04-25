'use strict';

var db = require('../config/db');
var uuid = require('uuid');


db.run('create table if not exists messages(id text, name text, email text, image text, message text)');


exports.findAll = function(cb){

    db.all("select * from messages", function(err, messages){
        cb(err, messages);
    })
};

//create new messages
exports.create = function(message, cb){

    // var myDate = moment().format('MMMM Do YYYY, h:mm:ss a');

    db.serialize(function(){
        var stmt = db.prepare("insert into messages values(?,?,?,?,?)");
        var x = uuid();
        stmt.run(x, message.name, message.email, message.image, message.message);
        stmt.finalize(function(err){
             cb(err, x);
        });
    });
}

exports.delete = function(id, cb){
    // console.log(id);
    db.run(`delete from messages where id='${id}'`, function(err){
    // db.run('delete from messages where id=?',[id], function(err){
        // console.log('delete function is called');
        if(err) return cb(err);
        cb(null);
    });

}
// exports.edit = function(id, cb){
//
// }
