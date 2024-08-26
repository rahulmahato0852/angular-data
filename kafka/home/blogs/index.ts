import mongoose from "mongoose"
import express from "express"
import { Kafka } from 'kafkajs'
import EventEmitter from "events";


const kafka = new Kafka({ brokers: ["localhost:9092"], clientId: "990" })

const consumer = kafka.consumer({ groupId: "2222" });
const producer = kafka.producer();
const responseEvent = new EventEmitter();

(async () => {
    try {
        await producer.connect();
        await consumer.connect();
        await consumer.subscribe({ topic: "user", fromBeginning: false });

        await consumer.run({
            eachMessage: async ({ message }) => {
                // Process incoming messages from "user" topic
                console.log("Received message:", message.value?.toString());
                responseEvent.emit("res", JSON.parse(message.value?.toString()!))
                // You can implement logic to store or process these messages here
            }
        });

        console.log("Kafka producer and consumer connected");
    } catch (error) {
        console.error("Error connecting Kafka producer/consumer:", error);
    }
})();

const app = express();

app.use(express.json());



app.get("/:id", async (req, res) => {

    try {
        await producer.connect()
        await producer.send({ messages: [{ value: JSON.stringify({ id: req.params.id }) }], topic: "amol", })

        // await consumer.connect()
        // await consumer.subscribe({ topic: "user", fromBeginning: false })
        // await consumer.run({
        //     eachMessage: async ({ message }) => {
        //     }
        // })
        responseEvent.on('res', (data) => {
            res.status(200).json({ message: "User fetch success", data })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})



app.listen(4000, () => {
    console.log("SERVER RUNINNG ON 4000 blogs");

})