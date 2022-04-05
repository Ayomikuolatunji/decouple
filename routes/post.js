const express=require("express")

const router=express.Router()


router.get("/posts", (req,res,next)=>{
    console.log(req.middle)
      title=req.body.title
      res.status(200).json({title})
})
.post("/posts",(req,res,next)=>{
    const title=req.body.title
    const name=req.body.name
    res.status(201).json({title:title, date: new Date().toISOString(), name:name})
})


module.exports=router