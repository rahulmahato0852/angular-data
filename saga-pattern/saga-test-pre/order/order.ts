import { Kafka } from 'kafkajs';
import express, { Response, Request } from 'express'
import { produceMessage } from '../kafka/kafka';
import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS } from '../topics';

const kafka = new Kafka({ brokers: ["localhost:29092"] });
const consumer = kafka.consumer({ groupId: "order-consumer-id" });


const app = express();

app.use(express.json());


app.post("/", async (req: Request, res: Response) => {
    console.log("Producing order request");
    await produceMessage(req.body, ORDER_REQUEST)
    console.log("Produced order request");

    console.log("consumer connecting");
    await consumer.connect();
    console.log("consumer connected");
    await consumer.subscribe({ topics: [ORDER_SUCCESS, ORDER_FAILED], fromBeginning: false })
    await consumer.run({
        eachMessage: async ({ message, topic }) => {
            // const data = JSON.parse(message.value?.toString()!);
            console.log("topic", topic);
            if (topic === ORDER_SUCCESS) {
                // await consumer.disconnect();
                res.status(200).json({ message: "order and payment success" })
            } else if (topic === ORDER_FAILED) {
                // await consumer.disconnect();
                res.status(400).json({ message: "order and payment failed" })
            } else {
                await consumer.disconnect();
                res.status(500).json({ message: "NO TOPIC MATCHED" })
            }
        }
    })

})



app.listen(3000, () => {
    console.log("ORDER SERVER RUNNIGN ON 3000");
})