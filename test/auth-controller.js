const { describe } = require("mocha");
const Sinon = require("sinon");
const expect=require("chai").expect
const authController=require("../controllers/auth")
const User=require("../models/user")

describe("testing controller-login",()=>{
    it('should throw an error with code 500 if accessing the database failed',(done)=>{
        Sinon.stub(User,"findOne")
        User.findOne.throws
        const req={
            body:{
               email:"Ayomiku@gmail.com",
               password:"johnjhhh"    
            }
        }
        authController.login(req,{}, ()=>{})
        .then(result=>{
            expect(result).to.be.an("error")
            expect(result).to.have.property("statusCode",500)
            done()
        })
        User.findOne.restore()
    })
})

describe("for user updateStatus",()=>{
    it("should send response with valid user status in the database",(done)=>{

    })
})