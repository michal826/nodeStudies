const express = require('express');
const router = express.Router();

const level = require('level');

const db = level('./db', {
    valueEncoding: 'json'
});

let todos = [];

//GETTING TODO LIST
router.get('/todo', (req, res) => {
    res.status(200).json({"todo": todos, length: todos.length});
});

//ROUTES FOR CREATE
router.post('/create', (req, res) => {
    let data = req.body;
    console.log('Data', data);

    todos.push(data);

    let t = todos.map(i => i.toLowerCase());
    todos = t;

    let id = Math.random().toString(16).substring(2);

    db.put(id, todos, err => {
        if(err){
            return console.log(`error: ${err.message}`);
        } else {
            console.log('saved todo');
        }
        
    });
});
    
//TODO:ID ROUTE
router.get('/todo/todo:id', (req, res) => {
    res.status(200).json({'test':'hello'});
})

module.exports = router;