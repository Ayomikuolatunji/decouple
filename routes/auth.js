const express=require("express")
const router=express.Router()
const {body}=require("express-validator/check")
const User=require("../models/user")



router.post("/signup",[
    body("email").trim().isEmail().withMessage("please enter a valid emil") .custom((value,{req})=>{
      User.findOne({email:value})
      .then(userDoc=>{
          if(userDoc){
              return Promise.reject("Email address already exits")
          }
      })
        }).normalizeEmail().isLength({min:4}), 
    body("password").trim().isLength({min:5}),
    body("name").trim().isLength({min:5})
])

module.exports=router