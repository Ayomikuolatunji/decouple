const User=require("../models/user")
const {validationResult}=require("express-validator")
const bcrypt=require("bcryptjs")

exports.signup=(req,res,next)=>{
    const errors=validationResult(req)
     if(!errors.isEmpty()){
        const error=new Error("Validation failed")
        error.statusCode=422
        error.data=errors.array()
        throw error
     }
    const email=req.body.email
    const name=req.body.name
    const password=req.body.password
    bcrypt.hash(password,15)
    .then(hashedPssw=>{
        const user=new User({
            
        })
    })
    .catch(error=>{
        if(error.statusCode){
            err.statusCode=500
        }
        next()
    })
}