const expect=require("chai").expect
const authMiddleWare=require("../middleware/is-auth")


describe("auth middleware",function(){
    it("It should throw an error if no authorization header is present",function(){
        const req={
            get:()=>{
                return null
            }
        }  
     
        expect(authMiddleWare.bind(this,req,{},()=>{})).to.throw("Not authenticated")
     })
     
     it("it should throw error when authorization has only one string",function(){
         const req={
             get:()=>{
                 return "xyz"
             }
         }
         expect(authMiddleWare.bind(this,req,{},()=>{})).to.throw()
     })
})

