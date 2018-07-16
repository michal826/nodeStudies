const express = require('express');
const router = express.Router();

const level = require('level');
const sublevel = require('level-sublevel');
const db = sublevel(level('../db', {valueEncoding: 'json'}));
 
let ids = db.sublevel('id');
let titles = db.sublevel('title');

// let todos = [];

ids.put('Straight outta brooklyn', {id: '3' }, (err) => {
    titles.put(1, {comments:'Thats a ghetto world', title:'Straight outta Compton'},() => {

   });
});

db.del('Hello World', (err) => {

});

const ops = [{type: 'del', key: '1', value:{comments:'Thats a huge world',title:'Hello World'}}];
  
db.batch(ops, function (err) {
    if(err){
       return console.log('Ooops!', err);  
    } 
    console.log('Great success dear leader!')
});

var stream = titles.createReadStream();
    stream.on('data', (data) => {
        ids.get(data.value.id, (err, uid) => {
        data.value.id = uid;
        todos.push(data.value);
        console.log(data.value);
     });
 });
 stream.on('close', () => {
    console.log(todos);
    todos.forEach((data) => {
        console.log(data);
    });
});



//db.createKeyStream().pipe(db.createDeleteStream()).on('end', cb)

let todos = [
{
    id:1,
    title: 'Hello World' 
},{
    id: 2,
    title: 'Fuck you World'
},{
    id: 3,
    title: 'Goodbye World'
}];

var todo = {
    todos: [],
    length: 0
};

router.get('/todo', (req, res) => {
    //res.send(todos);
    res.send(todo);
});


//ROUTES FOR CREATE
router.post('/todo', (req, res) => {
    var o = {
        name: "Hello World"
    };

    todo.todos.push(o);

    todo.length++;
});

module.exports = router;