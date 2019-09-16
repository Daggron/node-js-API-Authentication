const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const expressValidator = require('express-validator');
const postRoute = require('./routes/posts');

app.use(bodyparser.urlencoded({extended:false}));

mongoose.connect('mongodb+srv://Abhay:gulzi@cluster0-zbxxz.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});

let db = mongoose.connection;

db.once('open',()=>{
    console.log('Db connectd successfully');
});

db.on('error',(err)=>{
    console.log(err);
});

app.use(express.json());

app.use(expressValidator());

app.use('/api/user',authRoute);
app.use('/api/post',postRoute);


let port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`App started on port ${port}`);
});