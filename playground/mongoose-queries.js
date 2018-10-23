
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5bcee418aa07773a7c85e2b5';

if(!ObjectID.isValid(id)){
    console.log('Id not valid');
}

// Todo.find({
//     completed : false
// }).then((todos)=>{
//     console.log('todos ',todos);
// })


Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log('todo ',todo);
})

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('ID not found')
    }

    console.log('todo by id ',todo);

}).catch((e)=>console.log(e));




