//Starting point of the application.
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://localhost/auth');

//App setup (express setup)
//middleware of express. incoming requests will be passed to into both morgan and bodyparser.
app.use(morgan('combined')); //Logging requests sent to server.
app.use(bodyParser.json({type: '*/*'})); // parses request to JSON.
router(app);
//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);4
server.listen(port);
console.log('server listening on:',port);
