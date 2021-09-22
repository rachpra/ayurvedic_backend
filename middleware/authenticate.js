const jwt=require('jsonwebtoken')
const user=require('../models/userModel')
module.exports.checkUser=function(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1]
        console.log(token)
        const verifiedData=jwt.verify(token,'secretkey')
        // console.log(verifiedData.userId)
        user.findOne({_id:verifiedData.userId}) //search with the help of id
        .then(function(userData){
            // res.send(userData)
            console.log(userData)
            req.data=userData
            next()
        })
        .catch(function(err){
            res.status(401).json({message: "Authentication failed"})
        })
    }
       catch(err){
           res.status(401).json({err})
       }
}

//guard 2: it will check if user is admin or not
module.exports.checkAdmin=function(req,res,next){
    if(!req.data){
       return res.status(401).json({message: "Unauthorized user"})
    }
    else if(req.data.userType!=='Admin'){
        return res.status(401).json({message: "Unauthorized user"})
    }
    next()

}


module.exports.checkCustomer=function(req,res,next){
    if(!req.data){
       return res.status(401).json({message: "Unauthorized user"})
    }
    else if(req.data.userType!=='Customer'){
        return res.status(401).json({message: "Unauthorized user"})
    }
    next()

}