require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app');
 

const app = require('express')();

const http = require('http').Server(app);



http.listen(3000, function(){
    console.log('server is running');
});