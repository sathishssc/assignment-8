let mangoose = require("mongoose");

let postsModeling = mangoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String, required:true}

})

let postModel = mangoose.model("User",postsModeling)
module.exports = postModel;