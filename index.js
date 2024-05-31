const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path=require('path');
const DB = require("./config/db.js");
const cookieParser = require('cookie-parser')
const {restrictloginonly}=require('./middleware/auth.js');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const PORT = process.env.PORT || 3000;
DB;
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('Login')
})
app.get('/signup',(req,res)=>{
    res.render('Signup')
  })
  app.get('/forgotpassword',(req,res)=>{
    res.render("Forgotpass");
  })
app.use('/createaccount',require('./routes/createuser.js'))
app.use('/login',require('./routes/Signin.js'))
app.use('/Home',restrictloginonly,require('./routes/Home.js'))
app.use('/addplaylist',restrictloginonly,require('./routes/addplaylist'))
app.use('/playlist',restrictloginonly,require('./routes/playlist'))
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})