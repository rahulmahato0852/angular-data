import express, { Request, Response } from 'express'
import mongoose, { Mongoose } from 'mongoose'
import { Kafka } from "kafkajs"

const app = express()

app.use(express.json())



const kafka = new Kafka({
    clientId: "",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer()




const USER = mongoose.model("users", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
}, { timestamps: true }))



app.get("/", async (req: Request, res: Response) => {
    const result = await USER.find()
    res.status(200).json({ message: "Server running", result })
})
app.post("/", async (req: Request, res: Response) => {
    const result = await USER.create(req.body)
    // await producer.send({
    //     topic: "first-topic-user",
    //     messages: [
    //         { value: JSON.stringify(result) }
    //     ],
    // })
    // await producer.disconnect()
    res.status(200).json({ message: "User created" })
})

const userId = "66b46a2d8b2ce8a794c133ad"

app.post("/add-product", async (req: Request, res: Response) => {
    await producer.connect()
    console.log("body", req.body);
    await producer.send({
        topic: "first-topic-user",
        messages: [
            { value: JSON.stringify({ ...req.body, userId }) }
        ],
    })
    // await producer.disconnect()
    res.status(200).json({ message: "aaa" })
})





mongoose.connect("mongodb://localhost:27017/kafka-first-application")

mongoose.connection.once('open', () => {
    app.listen(3000, () => {
        console.log("SERVER RUNNING " + 3000);

    })
})