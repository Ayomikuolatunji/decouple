const express=require("express")
const app=express()
const router=require("./routes/feed")
const bodyParser=require("body-parser")
const cors=require("cors")


app.use(bodyParser.json())

app.use((req,res,next)=>{
    req.midlle="transfer"
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods","POST,DELETE,PATCH,GET,PUT")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    next()
})


app.use("/feed", router)


app.listen(8080,()=>{
    console.log("port running on localhost 3000")
})