const express=require("express")
const router=express.Router()
const {body}=require("express-validator")



router.post("/signup"[body("email").trim().isLength])

module.exports=router