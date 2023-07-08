const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/todos', {useNewURLParser: true});

const db = mongoose.connection;

db.on('error', (e)=> {console.log(e)});
db.once('open', ()=> {console.log("Connceted to database")});

app.use(express.json());

const todorouter = require('./routes/todo');
app.use('/todo', todorouter);

app.listen(5000, ()=> {
    console.log("Connected to server on port 5000");
})