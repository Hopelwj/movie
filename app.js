const express = require('express');
const app =express();
const path=require('path');
const mongoose=require('mongoose');
const _underscore= require('underscore');

var bodyParser = require('body-parser');
var pug=require('pug');

var port = process.env.PORT||3000
var session = require('express-session');
var cookieParser = require('cookie-parser')
var mongoStore = require('connect-mongo')(session)
var moment = require('moment');
app.locals.moment = moment;
var dbUrl= 'mongodb://localhost/nodeWeb'
//connect to mongodb database
mongoose.connect(dbUrl,{useMongoClient:true});
mongoose.Promise =global.Promise;


app.set('views', path.join(__dirname,"app/views/pages"));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser())

app.use(session({

    secret: "imooc",

    resave: false,

    saveUninitialized: true,

    store:new mongoStore({

        url: dbUrl,

        collection: "sessions"

    })

}))
require('./config/routes')(app)
app.listen(3000);
console.log(`start in ${port}`)