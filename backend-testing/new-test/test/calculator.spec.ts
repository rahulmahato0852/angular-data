import * as chai from 'chai';
chai.should();

describe("check should expect and assert", () => {

    const str = "Hello rahul";
    const number = 20;
    const arr = [1, 22, 34, "12"];
    const obj = { name: "rahul mahato", age: 20, mobile: 8446414152 };
    const bool = true

    it("check should", () => {
        str.should.to.be.ok
        str.should.to.be.equal("Hello rahul");
    })



})