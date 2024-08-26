class Calculator {

    constructor() { };


    add(a: number, b: number) {
        return a + b;
    }

    subtract(a: number, b: number) {
        return a - b;
    }

    divide(a: number, b: number) {
        return a / b;
    }
    multiply(a: number, b: number) {
        return a * b;
    }

    getRandomVal() {
        return Math.floor(Math.random() * 10 + 1)
    }

    logMessage(msg: string) {
        console.log(msg);
    }

}