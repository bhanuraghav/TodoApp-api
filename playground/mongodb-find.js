const {MongoClient,ObjectID} = require("mongodb");
 

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,db)=>{
    if(err){
        return console.log("Unable to connect to MongoDb server ");
    }
    console.log("connected to MDB server");

    // db.db('TodoApp').collection('Todos').find({
    //     //completed:false
    //     _id: new ObjectID('5bcc7cedd9cc373364a302f2')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("unable to find fetch todos ",err);
    // });
     db.db('TodoApp').collection('Todos').find().count().then((count)=>{
        console.log(`Todos count : ${count}`);
      
    },(err)=>{
        console.log("unable to find fetch todos ",err);
    });

   // db.close();
});