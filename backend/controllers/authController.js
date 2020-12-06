
const { validationResult } = require('express-validator')
const User=require('../models/user')
var jwt=require('jsonwebtoken')
var expressJwt=require('express-jwt')
const { use } = require('../routes/auth')



exports.signin=(req,res)=>{
    const errors=validationResult(req)


    
    const {email,password} = req.body
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                "error":"No record found"
            })
        }
        console.log(user)
        if(!user.authenticate(password)){
            return res.status(400).json({
                "error":"wrong password"
            })
        }

        const token=jwt.sign({_id:user._id},process.env.SECRET)

        //put token in cookeis
        res.cookie("token",token,{expire:new Date()+9999})

        const {_id,name,email,role}=user

       return res.json({
            token,user:{_id,name,email,role}
        })
    })

  

 
}

exports.signup=(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

     var user=new User(req.body)
    user.save((err,data)=>{
        if(err){
            return res.status(400).json({err:err})
        }
        return(res.json({
           name:data.name,
           email:data.email,
           id:data._id
        }))
    })
}

exports.signout=(req,res)=>{
    res.clearCookie()
    res.json({
        "message":"U are sign out"
    })
}

exports.isSignin=expressJwt({
        secret:process.env.SECRET,
        userProperty:'auth'
    })

exports.isAuthenticated=(req,res,next)=>{
    
    let checker=req.profile && req.auth && req.profile._id==req.auth._id
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
      return res.status(403).json({
        error: "You are not ADMIN, Access denied"
      });
    }
    next();
  };