import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { Kafka } from "kafkajs"


const app = express()

app.use(express.json())


const kafka = new Kafka({ brokers: ["localhost:29092"], clientId: "123" })

const consumer = kafka.consumer({ groupId: "1233" });
const producer = kafka.producer();


(async () => {
    await consumer.connect()
    await producer.connect()
    await consumer.subscribe({ topic: "userid", fromBeginning: false })
    await consumer.run({
        eachMessage: async ({ message, }) => {
            if (message) {
                const id = message.value?.toString()
                const result = await User.findById(id)
                console.log("res", id, result);

                await producer.send({
                    messages: [
                        { value: JSON.stringify(result) }
                    ],
                    topic: "result"
                })
            }
        }

    })
    console.log("CONSUMER AND PRODUCER CONNECTED");

})();



const User = mongoose.model("user", new mongoose.Schema({
    name: { type: String, required: true }
}))


app.post("/", async (req: Request, res: Response) => {
    const result = await User.create(req.body)
    res.status(200).json({ message: "User created", result })
})




mongoose.connect("mongodb://localhost:27017/kafka")

mongoose.connection.once("open", () => {
    app.listen(3000, () => {
        console.log("SERVER RUNNING");

    })
})


