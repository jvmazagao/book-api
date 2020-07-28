const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const bodyParser = require('body-parser');
const bookRouter = require('./routers/BookRoutes')(Book);

const port = process.env.PORT || 3000;
const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', bookRouter)

app.get('/', function (req, res) {
    res.send('Welcome to my API!');
})

app.listen(port, function () {
    console.log('Running on port: ', port);
})