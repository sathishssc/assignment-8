let express = require("express");
let app = express();
let mongoose = require("mongoose");
let postRoute = require("./post/posts");
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use('/post',postRoute)

mongoose.connect("mongodb+srv://sathishcharyssc:wnVp7CxJRXMHmQ3g@cluster0.oavc5fw.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((err)=>{
    console.log(err);
})


app.listen(300);