let mongoose = require("mongoose");

const potsSchema = mongoose.Schema({
    user:{type:String,required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Posting',required: true},
    content:{type:String,required:true}
})

let postModel = mongoose.model("Postdata",potsSchema)
module.exports = postModel;