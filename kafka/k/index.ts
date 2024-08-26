import express from "express";
import mongoose from "mongoose";
import { log } from "console";

import { Kafka } from "kafkajs"

const kafka = new Kafka({ brokers: ["localhost:9092"], clientId: "222" })

export const producer = kafka.producer()
export const consumer = kafka.consumer({ groupId: "128182828111" })



async function init() {
    try {
        await producer.connect()
        await consumer.connect()
        console.log("Consumer and producer connected");
    } catch (error) {
        console.log("errrrrr", error);

    }

}

init()




const User = mongoose.model("user", new mongoose.Schema({ name: { type: String, required: true } }, { timestamps: true }));


(async () => {
    await consumer.subscribe({ topic: "userid", fromBeginning: false })
    consumer.run({
        eachMessage: async ({ message }) => {
            const id = message.value?.toString()
            const result = await User.findById(id)
            console.log("res", "db res");

            await producer.connect()
            await producer.send({ messages: [{ value: JSON.stringify(result) }], topic: "userData" })
            await producer.disconnect()
        }
    })
})()



const app = express()

app.use(express.json());

app.post("/", async (req, res) => {
    const result = await User.create(req.body);
    res.status(201).json({ message: "User created", result })
})



mongoose.connect("mongodb://localhost:27017/kafka")

mongoose.connection.once("open", () => {
    app.listen(3000, () => console.log("SERVER RUNNING ON 3000"))
})














