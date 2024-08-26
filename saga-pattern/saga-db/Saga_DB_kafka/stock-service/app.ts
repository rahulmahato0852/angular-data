import express from "express"
import { Kafka } from "kafkajs"
import connectDb from "./src/db/connect.db";
const app = express();

const PORT = 9000

connectDb.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Payment service started on port ${PORT}`);

    })
}).catch((err) => {
    console.log(err);
})

export default app