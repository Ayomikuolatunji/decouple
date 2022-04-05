const express=require("express")
const router=express.Router()
const createPost=require("../controller/feeds")
const getPosts=require("../controller/feeds")
const {body}=require("express-validator")
const getPost=require("../controller/feeds")


router
.get("/posts",getPosts.getPosts)
.post("/posts",
 [body("title").trim().isLength({min:3}), body("content").isLength({min:4})],
createPost.createPost)

router.get("/posts/:postId",getPost.getPost)
.put("/posts/:postId",[body("title").trim().isLength({min:3}), body("content").isLength({min:4})])

module.exports=router