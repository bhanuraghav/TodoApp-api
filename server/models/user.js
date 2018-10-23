var mongoose = require('mongoose');


var User =  mongoose.model('User',{
    email: {
        type: String,
        required : true,
        trim : true,
        minlength :1
    }
})


module.exports = {User}


// var user = new User({
//     email: 'bhanuraghav'
// });

// user.save().then((doc)=>{
//     console.log(doc);
// },(e)=>{
//     console.log(e);
// })