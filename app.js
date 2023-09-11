require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app');
 
const app = require('express')();
const userRoute = require('./routes/userRoute');
const http = require('http').Server(app);


app.use('/',userRoute);  


http.listen(8000, function(){
    console.log('server is running');
});