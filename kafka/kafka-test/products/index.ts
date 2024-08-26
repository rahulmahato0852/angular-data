import express, { Request, Response } from 'express'
import { Kafka } from "kafkajs"
import mongoose from 'mongoose'

const app = express()

app.use(express.json())



const kafka = new Kafka({
    clientId: "",
    brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({
    groupId: "123"
})




const Products = mongoose.model("users", new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
}, { timestamps: true }))




app.get('/', async (req: Request, res: Response) => {
    const result = await Products.find()
    res.status(200).json({ message: "all Product fetched", result })
})

app.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await Products.find({ userId: id })
    res.status(200).json({ message: "User Product fetched", result })
})


app.post('/', async (req: Request, res: Response) => {
    await consumer.connect()

    await consumer.subscribe({ topic: "first-topic-user", fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, message, partition }) => {
            let data = message.value?.toString()
            if (data) {
                console.log(JSON.parse(data));
                const result = await Products.create(JSON.parse(data))
                res.status(200).json({ message: "User Product added", result })
            }
        }
    })
    consumer.disconnect()
})






mongoose.connect("mongodb://localhost:27017/kafka-first-application-products")

mongoose.connection.once('open', () => {
    app.listen(3001, () => {
        console.log("SERVER RUNNING" + 3001);
    })
})


