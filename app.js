// git support https://code.visualstudio.com/docs/editor/versioncontrol
// tutorial code repository https://github.com/iamshaunjp/node-js-playlist
// video tutorial https://www.youtube.com/watch?v=4N0d8HhU5DE

// console.log("Hello Saif, You are learning Node.js!");

// setTimeout(function(){
//     console.log("Three seconds \n have passed!");
// //test
// },3000);

var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controlers
todoController(app);

//listen to port
app.listen(3000);
console.log('you are listening to port 3000');