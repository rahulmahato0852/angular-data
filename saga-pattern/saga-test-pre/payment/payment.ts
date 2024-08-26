import { Kafka } from 'kafkajs';
import express, { Request, Response } from 'express';
import { PAYMENT_FAILED, PAYMENT_REQUEST, PAYMENT_SUCCESS } from '../topics';
import { produceMessage } from '../kafka/kafka';


const kafka = new Kafka({ brokers: ["localhost:29092"] });

const consumer = kafka.consumer({ groupId: "payment-kafka-groupId" })



const app = express();
app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
    await consumer.connect();
    console.log("consumer connected");

    await consumer.subscribe({ topics: [PAYMENT_REQUEST], fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ message, topic }) => {
            console.log("consumer connected", topic);;
            console.log("BODY data", req.body);
            if (req.body.status === "success") {
                await produceMessage({ message: JSON.parse(message.value?.toString()!) }, PAYMENT_SUCCESS);
                res.status(200).json({ message: "Payment success", data: JSON.parse(message.value?.toString()!) });
                await consumer.disconnect();
            } else {
                await produceMessage({ message: JSON.parse(message.value?.toString()!) }, PAYMENT_FAILED);
                res.status(400).json({ message: "Payment failed", data: JSON.parse(message.value?.toString()!) })
                await consumer.disconnect();
            }
        }
    })

})



app.listen(4000, () => {
    console.log("PAYEMNT SERVER RUNNING ON 4000");
})