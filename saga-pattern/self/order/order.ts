import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Kafka } from 'kafkajs';
import { consumer, producemesage } from '../kafka/producer';
import EventEmitter from 'events';


const app = express();

const ev = new EventEmitter();
app.use(express.json());

const init = async () => {


    try {



        await consumer.connect()
        console.log("connected");

        await consumer.subscribe({ topics: ["order-success", "order-failed"], fromBeginning: false })
        await consumer.run({
            eachMessage: async ({ message, topic }) => {
                console.log("message", JSON.parse(message.value?.toString()!));
                if (topic === "order-failed") {
                    ev.emit("error", message)
                } else if (topic === "order-success") {
                    ev.emit("data", JSON.parse(message.value?.toString()!))
                }
                console.log("disconnected");

                // await consumer.disconnect()
            }
        })
    } catch (error) {
        console.log("errrrrr", error);

    }
    finally {
        await consumer.disconnect()
    }
}

app.post("/", async (req: Request, res: Response) => {
    try {
        await init();
        await producemesage({ message: req.body, topic: "order" })

        ev.once("data", (data) => {
            res.status(200).json({ message: data })
        })
        ev.once("error", (data) => {
            res.status(400).json({ k: "payment faild order failed", message: data })
        })

    } catch (error) {

        res.status(500).json({ error })
    }
})


app.listen(3000, () => {
    console.log("SERVER RUNNING ON 3000");
})






