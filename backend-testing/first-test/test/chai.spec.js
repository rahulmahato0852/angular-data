import { assert, expect, should } from 'chai'

should();

// #### ASSERTS
describe('Aspect check', function () {

    let username = 'rahul mehata'
    let userList = ["ram", "sham", "akhlesh", "rakesh", "anup"]

    it("check string", function () {
        assert.typeOf(username, 'string')
    })

    it("isequal to username", () => {
        assert.equal(username, "rahul mehata")
    })

    it("is userlist length equal to", () => {
        assert.lengthOf(userList, 5)
    })

})


// SHOULD

describe('should check', () => {
    let username = 'code improve';
    let myList = {
        item: ["a", "bb", "ccc", "dddd", "eeeee"]
    }
    it("check string", () => {
        username.should.be.a('string')
    })

    it("eual check", () => {
        username.should.equal('code improve')
    })
    it("length check", () => {
        myList.should.have.property('item').with.lengthOf(5)
    })

})


// expect


describe('DESCRIBE CHECK', () => {
    let username = 'code improve';
    let myList = {
        item: ["a", "bb", "ccc", "dddd", "eeeee"],
        title: "titititititi",
        address: {
            mobile: [8446414152, 8623986838],
            country: ["india", "china", "america"]
        }
    }

    it('string match', () => {
        expect(username).to.be.a('string')
    })
    it('equal match', () => {
        expect(username).to.be.equal('code improve')
    })
    it('length match', () => {
        expect(username).to.be.lengthOf(12)
    })
    it('object match', () => {
        expect(myList).to.have.property('item').with.length(5)
    })

    it('api object key match', () => {
        expect(myList).to.have.all.keys('item', 'title', "address")
    })

    it('check mobile number', () => {
        expect(myList).to.have.nested.property('address.mobile[0]').to.be.equal(8446414152);
    })
    it('check country exists', () => {
        expect(myList).to.have.nested.property('address.country').to.be.include('america');
    })

})
