import express from "express";
import mongoose from "mongoose";
import { log } from "console";
import EventEmitter from "events";

import { Kafka } from "kafkajs"

const kafka = new Kafka({ brokers: ["localhost:9092"], clientId: "121" })

export const producer = kafka.producer()
export const consumer = kafka.consumer({ groupId: "12111" })



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


const app = express()

app.use(express.json());

const event = new EventEmitter();

(async () => {
    await consumer.subscribe({ topic: "userData" });
    await consumer.run({
        eachMessage: async ({ message }) => {
            event.emit("user", JSON.parse(message.value?.toString()!))
        }
    })
})()


app.get("/:id", async (req, res) => {
    const { id } = req.params
    await producer.connect()
    await producer.send({ messages: [{ value: id }], topic: "userid" });
    await producer.disconnect()
    event.once("user", (data) => {
        res.status(200).json({ message: "User fetch success", data })
    })
})




app.listen(3001, () => console.log("Server running on 3001"))