import { expect } from "chai";
import Calculator from "../src/calculator"

describe("Asynchronous test", () => {

    let calc: Calculator
    it("should work with async and await", async () => {
        // arrage
        calc = new Calculator();
        // act
        const result = await calc.asyncChronounsFunction()
        // assert
        expect(result).to.equal(4);
    })

    it("should work with then and catch", () => {
        // arrage
        calc = new Calculator();
        // act
        calc.asyncChronounsFunction().then((res) => {
            expect(res).to.equal(4);
        })
        // assert
    })

})