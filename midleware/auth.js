let jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        let userInfo = jwt.verify(token,process.env.token);
        req.id = userInfo.id;
        req.userId = userInfo.id;
        next();
    }
    catch(err){
        res.status(500).json({
            err:err,
        })
    }
}