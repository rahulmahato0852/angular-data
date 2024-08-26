import express, { Request, Response } from "express"
import mongoose from 'mongoose'
import { Kafka } from "kafkajs"


const app = express()

app.use(express.json())


const kafka = new Kafka({ brokers: ["localhost:9092"], clientId: "11211" })

const proucer = kafka.producer()
const consumer = kafka.consumer({ groupId: "222" });

(async () => {

    try {
        await consumer.connect()
        await consumer.subscribe({ topic: "amol", fromBeginning: false })
        await consumer.run({
            eachMessage: async ({ message, partition, topic }) => {
                console.log("Message", message);

                if (message) {
                    const result = await User.findById(JSON.parse(message.value?.toString()!).id)
                    console.log("res", result);

                    await proucer.connect()
                    await proucer.send({
                        messages: [
                            { value: JSON.stringify(result) }
                        ], topic: "ss"
                    })
                    // await proucer.disconnect()
                }
            }
        })
    } catch (error) {
        console.log("eeeee", error);
    }
})()






const User = mongoose.model("user", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
}, { timestamps: true }))






app.post('/', async (req: Request, res: Response) => {
    const result = await User.create(req.body)
    res.status(201).json({ message: "User created success", result })
})


mongoose.connect("mongodb://localhost:27017/kafka-reusable")
mongoose.connection.once('open', () => {
    console.log("MONGOOSE CONNECTED");
    app.listen(3000, () => {
        console.log({ message: "SERVER RUNNING ON 3000" })
    })
})



