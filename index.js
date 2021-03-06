const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./todo/control.js');

app.use(routes);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.get('/', (req, res) => {
    res.status(200).json({"Hello": "Hello"});
});

app.post('/', (req, res) => {
    let data = req.body;
    console.log('data: ', data);
    res.status(200).json({"status": 'recieved'});
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

