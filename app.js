const express=require("express")
const app=express()
const router=require("./routes/feed")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")

app.use(bodyParser.json())

app.use((req,res,next)=>{
    req.midlle="transfer"
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods","POST,DELETE,PATCH,GET,PUT")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    next()
})


app.use("/feed", router)

mongoose
  .connect(
    'mongodb+srv://mongoose:john123@cluster0.xcjno.mongodb.net/microservice',{
         useNewUrlParser: true,
         useUnifiedTopology: true 
  }
  )
  .then(con=>{
    console.log("connected to the database")
  })
  .then(result => {
    app.listen(8080,()=>{
      console.log("port running on localhost 3000")
    });
  })
  .catch(err => {
    console.log(err);
  });