import sinon from 'sinon'
import { expect } from 'chai'
import Student from './index.js'

const studentObj = new Student();



describe('----spay----', function () {

    it('test-user-function', () => {
        expect(studentObj.userId()).to.be.equal(12);
    })

    it('function count', function () {
        const spyObj = sinon.spy(studentObj, 'getInfo');
        studentObj.home(5)
        expect(spyObj.calledOnce).to.be.true
    })

    it('function arguments => check count', () => {
        const spyObj = sinon.spy(studentObj, 'getInfo')
        studentObj.home(5)
        expect(spyObj.calledWith(12, 1)).to.be.true;
    })


})
