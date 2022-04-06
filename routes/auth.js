const express=require("express")
const router=express.Router()
const {body}=require("express-validator/check")
const User=require("../models/user")
const signup=require("../controllers/auth")



router.post("/signup",[
    body("email").trim().isEmail().withMessage("please enter a valid emil") .custom((value,{req})=>{
      User.findOne({email:value})
      .then(userDoc=>{
          if(userDoc){
              return Promise.reject("Email address already exits")
          }
      })
        }).normalizeEmail().isLength({min:4}), 
    body("password").trim().isLength({min:5}).isEmpty(),
    body("name").trim().isLength({min:5}).isEmpty()
], signup.signup)

module.exports=router