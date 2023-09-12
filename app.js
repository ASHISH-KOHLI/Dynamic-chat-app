require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app');

const app = require('express')();
const userRoute = require('./routes/userRoute');
const User = require('./models/userModel')
const http = require('http').Server(app);


app.use('/',userRoute);  

const io = require('socket.io')(http);

const usp = io.of('/user-namespace');

usp.on('connection', async function(socket){
    console.log('User Connected');
    
    var userId = socket.handshake.auth.token;
   await User.findByIdAndUpdate({_id:userId},{$set:{is_online:'1'}}); 

    socket.on('disconnect', async function(socket){
        console.log('user Disconnected')
    var userId = socket.handshake.auth.token;

   await User.findByIdAndUpdate({_id:userId},{$set:{is_online:'0'}}); 

    })

});

http.listen(8000, function(){
    console.log('server is running');
});