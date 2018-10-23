const expect = require('expect'),
      request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text : "First"
},{
    text : "Second"
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
       return Todo.insertMany(todos);
   }).then(()=>done());
   //Todo.remove({}).then(()=>done());
});

describe('POST /todos', ()=>{
   it('should create a new todo',(done)=>{
       var text = 'Test todo test';
       request(app)
       .post('/todos')
       .send({text : text})
       .expect(200)
       .expect((res)=>{
            expect(res.body.text).toBe(text);
       })
       .end((err,res)=>{
           if(err){
            return   done(err);
           }

           Todo.find({text}).then((todos)=>{
               expect(todos.length).toBe(1);
               expect(todos[0].text).toBe(text);
               done();
           }).catch((e)=>done(e));
           

       })
   }) 
   
   
});


describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2) 
        })
        .end(done);
    })
})