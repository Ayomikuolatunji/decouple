const User=require("../models/user")
const {validationResult}=require("express-validator/check")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

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
    .then(hashedPwd=>{
        const user=new User({
            email:email,
            name:name,
            passsword:hashedPwd
        })
        return user.save()
    })
    .then(result=>{
        res.status(201).json({message:"user created", userId:result._id})
    })
    .catch(error=>{
        if(error.statusCode){
            err.statusCode=500
        }
        next()
    })
}
exports.login=(req,res,next)=>{
    const email=req.body.email
    const password=req.body.passsword
    let loadedUser;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            const error=new Error("No user found with this email")
            error.statusCode=404
            throw error
        }
        loadedUser=user
        return  bcrypt.compare(password, user.password)
    })
    .then(isEqual=>{
        if(!isEqual){
            const error=new Error("password does not match the user account")
            error.statusCode=401
        }
        const token=jwt.sign({
            email:loadedUser.email, 
            userId:loadedUser._id.toString()
        },"somesupersupersecretsecret",{expiresIn:"100hrs"})
        res.status(200).json({token, userId:loadedUser._id.toString()})
    })
    .catch(error=>{
        if(error.statusCode){
            err.statusCode=500
        }
        next()
    })

}