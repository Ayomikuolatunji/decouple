const expect=require("chai").expect

it("add numb to numbers", ()=>{
    const num1=1
    const num2=2
    expect(num1 + num2).to.equal(3)
})
it("add numb should not  to numbers", ()=>{
    const num1=1
    const num2=2
    expect(num1 + num2).not.to.equal(3)
})