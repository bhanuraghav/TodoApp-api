const {MongoClient,ObjectID} = require("mongodb");
 

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,db)=>{
    if(err){
        return console.log("Unable to connect to MongoDb server ");
    }
    console.log("connected to MDB server");

    //deleteMany
    // db.db('TodoApp').collection('Todos').deleteMany({text:'Hello'}).then((result)=>{
    //     console.log(result);
    // });

    //deleteOne
    // db.db('TodoApp').collection('Todos').deleteOne({text:'bye'}).then((result)=>{
    //         console.log(result);
    // });

    //FindOneAndDelete
    // db.db('TodoApp').collection('Todos').findOneAndDelete({completed : true}).then((result)=>{
    //     console.log(result);
    // })


   // db.close();
});