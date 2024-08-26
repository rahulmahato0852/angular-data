import axios from "axios";

class Calculator {

    add(a: number, b: number): number {
        this.logMessage("Hiii i am a log message")
        const c = this.getRandomValue();
        return a + b + c;
    }
    subtract(a: number, b: number): number {
        return a - b;
    }
    devide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Cannot devide by 0")
        }
        return a / b
    }

    getRandomValue(): number {
        return Math.floor(Math.random() * 10 + 1)
    }

    logMessage(msg: string) {
        console.log(msg);
    }


    asyncChronounsFunction() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(4)
            }, 1000)
        })
    }


    async getUser() {
        return await axios.get("https://jsonplaceholder.typicode.com/users/1")
    }
    async saveUser(userPayload: any) {
        return await axios.post("https://jsonplaceholder.typicode.com/users", userPayload)
    }



}




export default Calculator