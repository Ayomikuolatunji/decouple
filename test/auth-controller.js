const { describe } = require("mocha");
const Sinon = require("sinon");
const expect=require("chai").expect
const authController=require("../controllers/auth")
const User=require("../models/user")

describe("testing controller-login",()=>{
    it('should throw an error  with code 500 if accessing the database failed',()=>{
        Sinon.stub(User,"findOne")
        User.findOne.throws

        User.findOne.restore()
    })
})