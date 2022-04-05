const express=require("express")
const app=express()
const router=require("./routes/post")
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


app.use("/v1", router)


app.listen(3000,()=>{
    console.log("port running on localhost 3000")
})