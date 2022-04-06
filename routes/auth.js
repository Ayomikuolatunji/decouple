const express=require("express")
const router=express.Router()
const {body}=require("express-validator/check")
const User=require("../models/user")



router.post("/signup",[body("email").trim().isEmail().withMessage("please enter a valid emil").custom((value,{req})=>{
      User.findOne({email:value})
      .then(userDoc=>{

      })
})])

module.exports=router