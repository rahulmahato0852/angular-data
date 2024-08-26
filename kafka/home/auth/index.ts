import mongoose from "mongoose"
import express from "express"
import { Kafka } from 'kafkajs'


const kafka = new Kafka({ brokers: ["localhost:9092"], clientId: "000012" })

const consumer = kafka.consumer({ groupId: "111" })
const producer = kafka.producer();





const app = express();

app.use(express.json());

const User = mongoose.model("user", new mongoose.Schema({ name: { type: String, required: true } }))


app.post('/', async (req, res) => {
    const result = await User.create(req.body)
    res.status(200).json({ message: "User fetch success", result })
});


(async () => {
    try {
        await consumer.connect()
        await producer.connect()
        await consumer.subscribe({ topic: "amol", fromBeginning: false })
        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log("called");
                if (message) {
                    const result = await User.findById(JSON.parse(message.value?.toString()!).id)
                    console.log("res", result);
                    await producer.send({ messages: [{ value: JSON.stringify(result) }], topic: "user" })
                }
            }
        })
    } catch (error) {

    }
})()



mongoose.connect("mongodb://localhost:27017/kafka")

mongoose.connection.once("open", () => {
    app.listen(3000, () => {
        console.log("SERVER RUNNING 3000 auth");
    });
});