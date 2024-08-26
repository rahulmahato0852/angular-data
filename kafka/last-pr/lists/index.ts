import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { Kafka } from "kafkajs"
import EventEmitter from 'events'


const app = express()

app.use(express.json())


const kafka = new Kafka({ brokers: ["localhost:29092"], clientId: "123" })

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: "12" });





const User = mongoose.model("user", new mongoose.Schema({
    name: { type: String, required: true }
}));
const resEvent = new EventEmitter();
(async () => {
    await consumer.subscribe({ topic: "result", fromBeginning: false })
    await consumer.run({
        eachMessage: async ({ message, }) => {
            const data = JSON.parse(message.value?.toString()!)
            resEvent.emit("res", data)
        }
    })
})();



app.get("/:id", async (req: Request, res: Response) => {
    try {
        await producer.connect()
        await consumer.connect()
        await producer.send({
            messages: [
                { value: req.params.id }
            ], topic: "userid"
        })

        resEvent.on("res", (data) => {
            res.status(200).json({ message: "User fetch success", data })
        })


    } catch (error) {
        res.status(500).json({ message: error })
    }

    // res.status(200).json({ message: "User created", result })
})




mongoose.connect("mongodb://localhost:27017/kafka")

mongoose.connection.once("open", () => {
    app.listen(4000, () => {
        console.log("SERVER RUNNING");

    })
})


