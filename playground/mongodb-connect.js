//const MongoClient = require("mongodb").MongoClient;
const {MongoClient,ObjectID} = require("mongodb");

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,db)=>{
    if(err){
        return console.log("Unable to connect to MongoDb server ");
    }
    console.log("connected to MDB server");
    db.db('TodoApp').collection('Todos').insertOne({
        text: "Hello",
        completed : false
    },(err,result)=>{
        if(err){
            return console.log('unable to insert');
        }
        //console.log(JSON.stringify(result.ops,undefined,2));
        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
})
 