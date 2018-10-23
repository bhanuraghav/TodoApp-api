var mongoose = require('mongoose');

mongoose.Promise= global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });
//mongodb://todoapp:todoapp1@ds239703.mlab.com:39703/todoapp

module.exports = {
    mongoose
}