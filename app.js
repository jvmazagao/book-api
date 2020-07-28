const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Welcome to my API!');
})

app.listen(port, function() {
    console.log('Running on port: ', port);
})