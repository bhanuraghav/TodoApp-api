const {MongoClient,ObjectID} = require("mongodb");
 

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,db)=>{
    if(err){
        return console.log("Unable to connect to MongoDb server ");
    }
    console.log("connected to MDB server");

    //findOneAndUpdate(filter, update, options, callback) 
    db.db('TodoApp').collection('Todos').findOneAndUpdate({
        _id:new ObjectID("5bcc8f14ed315be7ac39d0f6")
    
    },{
        $set: {
            completed:false
        }
        // $inc: {
        //     age:1 //increment age by one
        // }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });

   // db.close();
});