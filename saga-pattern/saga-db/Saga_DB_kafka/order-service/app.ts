import express from "express"
import { Kafka } from "kafkajs"
import connectDb from "./src/db/connect.db";
import orderroutes from "./src/routes/order.routes"
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(orderroutes)

const PORT = 7000
connectDb.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`order service started on port ${PORT}`);

    })
}).catch((err) => {
    console.log(err);
})

export default app