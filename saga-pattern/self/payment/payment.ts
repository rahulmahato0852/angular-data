import express, { Request, Response } from 'express'
import { consumer, producemesage } from '../kafka/producer';



const app = express();

app.use(express.json());


(async () => {

})();



app.post("/", async (req: Request, res: Response) => {
    // await consumer.connect()
    await consumer.subscribe({ topic: "payment-request", fromBeginning: true })
    console.log("subscribed");

    await consumer.run({
        eachMessage: async ({ message, topic }: { message: any, topic: any }) => {
            if (topic === "payment-request") {
                console.log("Payment requested");
                // Convert the buffer data to a string
                // Log the message string before parsing
                console.log("body", req.body);

                if (req.body.status === "success") {
                    await producemesage({ message: "Payment successfully ok bro plz visit again", topic: "payment-success" })
                    res.status(201).json({ message: "Payment successfull" })
                } else {
                    await producemesage({ message: "Payment failed by user", topic: "payment-failed" })
                    res.status(400).json({ message: "Payment Failed 🙄🙄🙄" })
                }

            } else {
                console.log("Wrong topic");
                res.status(200).json({ message: "Wrong topic" })

            }
        }
    })
})




app.listen(4000, () => {
    console.log("SERVER RUNNING ON 4000");
})
