var express = require('express'),
    bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());


app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
 
        res.status(400).send(e);
    })
   // console.log(req.body);
})

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
    // User.find().then((user)=>{
    //     res.send({user})
    // },(e)=>{
    //     res.status(400).send(e);

    // })
})


app.listen(3000,()=>{
    console.log('Started on port 3000');
})


module.exports={
    app
}