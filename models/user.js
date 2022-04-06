const mongoose=require("mongoose")
const mongoose=mongoose.Schema


const userSChema=new Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true,
    },
    posts:[{
        type:SChema.Types.ObjectId,
        ref:"Post"
    }]

})