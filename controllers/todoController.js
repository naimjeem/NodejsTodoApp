var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connecto MongoDB
mongoose.connect('mongodb://<dbuser>:<dbpass>@ds157469.mlab.com:57469/<dbname>');

//create Schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({extended: false});
//var data = [{item: 'React js docs'}, {item: 'Node.js docs'}];

module.exports = function(app){

    app.get('/todo', function(req, res){
        //get data from DB
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });        
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //add data to DB
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete data from DB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
}; 
