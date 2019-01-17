require('./config/config');
const express = require('express'),
    bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const _ =require('lodash')


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
// const port = process.env.PORT || 3000;
const port = process.env.PORT;

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

//Delete Route

app.delete('/todos/:id',(req,res)=>{
    //get the id
    var id = req.params.id;

    //validate the id -> not valid? return 404

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    //remove todo by id
        //success
            //if no doc , send 404
            //if doc send doc with 200
        //error
            //400 with empty body

    Todo.findByIdAndDelete(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
    
});

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed)&& body.completed){
        body.completedAt = new Date().getTime();
   }else{
       body.completed =false;
       body.completedAt =null;
   }

   Todo.findByIdAndUpdate(id,{$set: body},{new : true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();  
        }
        res.send({todo});
   }).catch((e)=>{
       res.status(400).send();
   })  
})

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    user.save().then((user)=>{
        return user.generateAuthToken();
        // res.send(user);
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
})

app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=>{
       user.generateAuthToken().then((token)=>{
           res.header('x-auth',token).send(user);
       });
    }).catch((e)=>{
        res.status(400).send();
    })
})

app.delete('/users/me/token',authenticate,(req,res)=>{
    // console.log(req);
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
    });
})


app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})


module.exports={
    app
}