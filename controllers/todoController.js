var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
//Here you should update your login credentials to database
//You may replace your login credentials following the pattern: 'mongodb://YOUR_USER:YOUR_PASSWORD@ds223063.mlab.com:23063/tutorial'
mongoose.connect('mongodb://tutorial_user:tutorial_password1@ds223063.mlab.com:23063/tutorial', {useNewUrlParser: true});

//Create a schuma - this is a like a blueprint
var toDoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', toDoSchema);
var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function (app) {

    app.get('/todo', function (req, res) {
        //get data from mongodb and pass it to the view
        Todo.find({}, function(err,data){
            if(err){
                throw err;
            }
            res.render('todo', {todos: data});
            //in case you want to use as rest API, uncomment the line bellow, an comment the line above
            //res.json(data);
        });
    });

    app.post('/todo', urlencodedParser,function (req, res) {
        //console.log(req.body);
        //get data from the view and add it to the mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err){
                throw err;
            }
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if(err){
                throw err;
            }
            res.json(data);
        });
    });

};