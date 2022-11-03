const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const getCommands=require('./routes/getCommands');


const MONGODB_URI =
  `mongodb+srv://nikhil03:hellskitchen03@cluster0.noxzw.mongodb.net/shop?retryWrites=true&w=majority`;

const app = express();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.use(getCommands);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log('connected')
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
