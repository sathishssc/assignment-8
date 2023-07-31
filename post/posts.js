let express = require("express");
let routed = express.Router();
let Postdata = require("./model")
let auth = require("../midleware/auth");
let bodyParser = require("body-parser");
routed.use(bodyParser.json());
let jwt = require("jsonwebtoken");

require('dotenv').config()
//for get all posts
routed.get("/getPost",auth,(req,res)=>{
   let postId = req.query.id;
   let filter = {};
   if(postId){
      filter = {
         _id:postId,
      };
   }
 Postdata.find(filter).then(data =>{
   res.status(200).json({
      messege:"data fetched success",
      data:data,
   })

 })
 .catch(err =>{
   res.status(400).json({
      messege:"data fetched failed",
      err:err,
   })
 })
})
// let postId = req.query.id;
// if(postId){
//    filter={
//       _id:postId,
//    }

//    Postdata.find(filter).then(response =>{
//       res.status(200).json({
//          messege:"data fetched successfully",
//          data:response,
//       })
//    }).catch(err =>{
//       res.status(400).json({
//          err:err,

//       })
//    })
// }

// })
//for creating post
routed.post('/createPost',auth,(req,res)=>{
   let data = req.body;
   let userId = req.userId;
   console.log(data);
   let posts = new Postdata({
      user:data.user,
      userId:userId,
      content:data.content
   }) 

   posts.save()
   .then(response =>{
      res.status(300).json({
         messege:"data created successfully",
         data:response
      })
   })
   .catch(err =>{
      res.status(400).json({
         messege:"error occurs",
         err:err,
      })
   })
})
//updating post
routed.put("/posts/:postId",auth,(req,res)=>{
   let postId = req.params.postId;
   let newcontent = req.body.content;
   console.log(newcontent);
Postdata.findByIdAndUpdate(postId,{content:newcontent})
.then(response =>{
   res.status(200).json({
      messege:"content updated successfully",
      data:response,
   })
})
.catch(err =>{
   res.status(400).json({
      messege:"failde to update",
      err:err,
   })
})

})
//deleting post
routed.delete("/posts/:postId",auth,(req,res)=>{
   let postId = req.params.postId;
   console.log(postId);
   Postdata.findByIdAndDelete(postId).then(response =>{
      res.status(200).json({
         messege:"deleting sucess",
         data:response,
      })
   })
   .catch(err =>{
      res.status(300).json({
       err:"deleting failsd"
      })
   })
})


//for registering post
let User = require("./registerModel");
let bcrypt = require("bcrypt");
routed.post("/register",(req,res)=>{
   let data = req.body;

   bcrypt.hash(data.password,10).then(encrypted =>{
      let user = new User({
         name:data.name,
         email:data.email,
         password:encrypted,
      })
   
      user.save()
      .then(response =>{
         res.status(200).json({
            messege:"registration successfull",
            data:response,
         })
      })
      .catch(err =>{
         res.status(400).json({
            messege:"registration failed",
            err:err,
         })
      })
   })
   

})


//for login

routed.post("/login",(req,res)=>{
   let data = req.body;

   User.findOne({email:data.email}).then(user =>{
      if(user){
         bcrypt.compare(data.password,user.password).then(auth =>{
            if(auth){
               let token = jwt.sign(
                  {
                     email:user.name,
                     name:user.name,
                     id:user._id,
                  },
                  process.env.token,
                  {
                      expiresIn:"1h",
                  }
               )
               res.status(200).json({
                  messege:"authentication successfull",
                  token:token,
               })
            }else{
               res.status(404).json({
                  messege:"authentication failed",
               })
            }
         })
      }
      else{
         res.status(404).json({
            messege:"something went wrong",
         })
      }
   })
   .catch(err =>{
      res.status(404).json({
         messege:"internal erro",
      })
   })
})

module.exports = routed;