let express = require("express");
let app = express();
let mongoose = require("mongoose");
let postRoute = require("./post/posts");
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use('/post',postRoute)
require('dotenv').config()
mongoose.connect(process.env.mongo)
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((err)=>{
    console.log(err);
})


app.listen(300);