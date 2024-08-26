import sinon, { SinonMock, SinonSpy, SinonStub } from "sinon";
import { expect } from "chai";
import Calculator from "../src/calculator";


describe.only("hooks test", () => {
    let spy: SinonSpy
    let stub: SinonStub
    let mock: SinonMock
    let cal: Calculator

    before(() => {
        console.log("Before");
        cal = new Calculator()
    })
    after(() => {
        console.log("after");
    })
    afterEach(() => {
        console.log("after each");
    })
    beforeEach(() => {
        console.log("Before each");
    })


    it('it should return sum', () => {
        // spy
        spy = sinon.spy(cal, 'add')
        stub = sinon.stub(cal, 'getRandomValue').returns(12);
        mock = sinon.mock(cal);
        let expectation = mock.expects('logMessage').exactly(1).withArgs('Hiii i am a log message');
        // arrange
        // act
        const result = cal.add(6, 3);
        // assert
        expect(result).to.be.equal(21);
        expect(spy.calledOnceWith(6, 3)).to.be.true;
        expectation.verify();
        spy.restore();
        stub.restore();
        mock.restore();
    })

    it('it should return subtraction', () => {
        // arrange
        spy = sinon.spy(cal, 'subtract');
        // act
        const result = cal.subtract(6, 3);
        // assert
        expect(result).to.be.equal(3);
        expect(spy.calledOnceWith(6, 3)).to.be.true
        spy.restore();
    })




});