import express from 'express'
import mongoose from 'mongoose'
import { Kafka } from "kafkajs"

const app = express()

const kafka = new Kafka({ brokers: ["localhost:9092"], clientId: "111" })

const proucer = kafka.producer()
const consumer = kafka.consumer({ groupId: "22122" });

// proucer.connect().then(() => {
//     console.log("Producer connected");
// }).catch((err) => {
//     console.log("producer err", err);
// })
(async () => {
    try {
        await consumer.connect()
        await proucer.connect()
    } catch (error) {
        console.log("eee", error);

    }

})()

app.use(express.json())




app.get('/:id', async (req, res) => {
    console.log("ccccc");
    try {

        await proucer.send({
            messages: [
                { value: JSON.stringify({ id: req.params.id }) }
            ], topic: "amol"
        })
        console.log("bbbb");

        await consumer.subscribe({ topic: "ss", fromBeginning: false })
        await consumer.run({
            eachMessage: async ({ message, topic, partition }) => {
                if (message) {
                    const data = JSON.parse(message.value?.toString()!);
                    console.log(data);
                    res.status(200).json({ message: "User fetch success with this id", data });
                }
            }
        })

    }
    catch (error) {
        res.status(500).json({ err: error })
    }


})







app.listen(5000, () => {
    console.log("SERVER RUNNING ON 5000");

})






