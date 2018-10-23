var express = require('express'),
    bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

//GET /todos/_id
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    //Validate id using isValid
        //404 -send back empty send
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();           
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    })
    
})

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})


module.exports={
    app
}