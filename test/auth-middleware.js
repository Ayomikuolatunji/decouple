const expect=require("chai").expect
const authMiddleWare=require("../middleware/is-auth")

it("It should throw an error if no authorization header is present",()=>{
   const req={
       get:()=>{
           return null
       }
   }  
   authMiddleWare(req,{},()=>{})
})