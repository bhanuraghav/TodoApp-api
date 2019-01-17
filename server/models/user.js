const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const _ = require('lodash');

var UserSchema =  new mongoose.Schema({
    email: {
        type: String,
        required : true,
        trim : true,
        minlength :1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value}is not a vaild email'
        }
    },
    password : {
        type : String,
        required : true,
        minlength: 8
    },
    tokens: [{
        access: {
            type:String,
            required:true
        },
        token:{
            type: String,
            required:true
        }
        
    }]
})

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
    
}


UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access ='auth';
    var token = jwt.sign({
         _id : user._id.toHexString(),
        access    
    },'abc123').toString();

    user.tokens.push({
        access,
        token
    });

    return user.save().then(()=>{
        return token;
    })
}

// UserSchema.methods.generateAuthToken = function () {
//     var user = this;
//     var access = 'auth';
//     var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  
//     user.tokens.push({access, token});
  
//     return user.save().then(() => {
//       return token;
//     });
//   };
  
var User = mongoose.model('User',UserSchema);

module.exports = {User}


// var user = new User({
//     email: 'bhanuraghav'
// });

// user.save().then((doc)=>{
//     console.log(doc);
// },(e)=>{
//     console.log(e);
// })