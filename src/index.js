// Express 

const express = require("express");
const Logger = require('../logger');

const logger = new Logger();

logger.on('message', (data) => {
    console.log('Called Listner ', data);
});

logger.log('Hello World!!');
logger.log('Hi');
// Called Listner  { id: '2de01bc4-19ce-4a6d-bf8e-f6ac754891bf', msg: 'Hello World!!' }
// Called Listner  { id: '79abe485-88d5-408c-87e6-f9c7dad7adc0', msg: 'Hi' }















var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public123'));

app.post('/contact', (req, res) => {

    if(!req.body.name) {
        return res.status(400).send('Name is required');
    }

    // No return as this is last statement 
    res.status(201).send(`Thank you ${req.body.name}`);
 
    // res.send("Hello World!");
});

app.post('/login', (req, res) => {
    if (!req.header('x-auth-token')) {
        return res.status(400).send('No Token');
    }

    if (req.header('x-auth-token') !== '12345') {
        return res.status(401).send('Not authorised');
    }

    res.send('logged In');

});

app.put('/post/:id', (req, res) => {

    res.json({
        id: req.params.id,
        title: req.body.title
    });
});

app.delete('/post/:id', (req, res) => {

    res.json({
        msg: `${req.params.id} Deleted`
    });
});

app.listen(3030, () => {
    console.log("Started application on port %d", 3030);
});







// Node fundamentals 

console.log(__filename, __dirname);