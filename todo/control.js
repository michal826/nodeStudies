const express = require('express');
const router = express.Router();
const moment = require('moment');

const level = require('level');

const db = level('./db', {
    valueEncoding: 'json'
});

let todos = [];

//GETTING TODO LIST
router.get('/todo', (req, res) => {
    //res.status(200).json({"todo": todos, length: todos.length});

    const collection = [];

    db.get("ids", (error, ids) => {
        ids.forEach((id, index)  => {
            db.get(id, (error, todos) => {
                collection.push(todos);

                if(index === ids.length - 1){
                    res.status(200).json(collection);
                }
            });
        });
    });
});

//ROUTES FOR CREATE
router.post('/create', (req, res) => {
    let todo = req.body;
    console.log('Data', todo);


    let id = Math.random().toString(16).slice(2);
    todo.time = moment().format('MMMM Do YYYY, h:mm:ss a')
    todo.id = id;

    todos.push(todo);

    if(todo.title == ""){
        res.status(200).json({message: "Empty"});
        console.log("Empty");
    } else {
        db.put(id, todo, err => {
            if(err){
                return console.log(`error: ${err.message}`);
                res.status(500).json({message: err.message})
            } else {
                console.log(`Saved todo - id number ${id}`);
                db.get('ids', (error, data) => {
                    if (!data) {
                        db.put("ids", [id], error => {
                            if (!error) {
                                res.status(200).json(todo);
                            }
                        });
                    } else {
                        data.push(id);
                        db.put("ids", data, error => {
                            if (!error) {
                                res.status(200).json(todo);
                            }
                        });
                    }
                });
            }
        });
    
    }
});
    
//TODO:ID ROUTE
router.get('/todo/get/:id', (req, res, next) => {
    console.log('Request Id:', req.params.id);

    db.get(req.params.id, (error, data) => {
        if(!error) {
            res.status(200).json(data);
        }
    });
});

//UPDATE ROUTE
router.put('/todo/update/:id', (req, res) => {
    var id = req.params.id;
    var item = req.body;

    db.put(id, item, (err) =>{
        if(err){
            return console.log('Ooops!', err);
            res.status(400).json({message:"Updated"});
        } else {

        }
         

    db.get(id, function (err, value) {
        if (err) return console.log('Ooops!', err)
      });

    });
});

//DELETE ROUTE
router.delete('/todo/delete/:id', (req, res) => {
    var id = req.params.id;

    db.del(id, (err) => {
        if(err){ 
            return console.log(`error: ${err.message}`);
            res.status(400).json({message:err.message});
        } else {
            console.log(`Deleted ${id}`);
            res.status(202).json({message: "Deleted"});
        }  
        
    });
});

//SEARCH ROUTE
router.get('/todo/search', (req, res)=> {
    const q = req.query.q;

    const collection = [];

    db.get("ids", (error, ids) => {
        for (let i = 0; i < ids.length; i++) {
            db.get(ids[i], (error, todo) => {
                todo = Array.isArray(todo) ? todo[0] : todo;

                if(todo.title.includes(q)) {
                    collection.push(todo);
                }
                
                if (i === (ids.length - 1)) {
                    console.log('done')
                    res.status(200).json(collection);
                }
            });
        }
    });
});

function collect(ids, cb) {
    const collection = []

    for (let i = 0; i < ids.length; i++) {
        db.get(ids[i], (err, document) => {
            if (err) return cb(err, undefined)

            if (i === (ids.length - 1)) {
                return cb(null, collection)
            }
            collection.push(document)
        })
    }
}

module.exports = router;