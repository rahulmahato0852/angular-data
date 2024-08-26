import { expect } from "chai";
import Calculator from "../src/calculator"

describe('test calculator class', () => {

    it('it should return sum', () => {
        // arrange
        const calc = new Calculator();
        // act
        const result = calc.add(6, 3);
        // assert
        expect(result).to.be.equal(9)
    })

    it('it should return subtraction', () => {
        // arrange
        const calc = new Calculator();
        // act
        const result = calc.subtract(6, 3);
        // assert
        expect(result).to.be.equal(3);
    })
    it('it should return devide', () => {
        // arrange
        const calc = new Calculator();
        // act
        const result = calc.devide(6, 3);
        // assert
        expect(result).to.be.equal(2);
    })
    it('it should throw error', () => {
        // arrange
        const calc = new Calculator();
        // act
        // const result = calc.devide(6, 0);
        // assert
        expect(() => calc.devide(6, 0)).to.throw('Cannot devide by 0');
    })

})