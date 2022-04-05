const express=require("express")
const app=express()
const router=require("./routes/feed")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const path=require("path")
const multer=require("multer")



const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null, "images")
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toDateString() + "-" + file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="images/png" || file.mimetype==="images/jpg" || file.mimetype==="images/jpeg"){
         cb(null,true)
    }else{
        cb(null,false)
    }
}

app.use(bodyParser.json())

app.use((req,res,next)=>{
    req.midlle="transfer"
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods","POST,DELETE,PATCH,GET,PUT")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    next()
})

app.use((error,req,res,next)=>{
    console.log(error)
   const status = error.statusCode
   const message=error.message
   res.status(status).json({message:message})
})
app.use("/feed", router)
app.use("/images", express.static(path.join(__dirname, "images")))
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