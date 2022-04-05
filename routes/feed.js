const express=require("express")
const router=express.Router()
const createPost=require("../controller/feeds")
const getPosts=require("../controller/feeds")
const {body}=require("express-validator")


router
.get("/posts",getPosts.getPosts)
.post("/posts",
 [body("title").trim().isLength({min:4}), body("content").isLength({min:4})],
createPost.createPost)


module.exports=router