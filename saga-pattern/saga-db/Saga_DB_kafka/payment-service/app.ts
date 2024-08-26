import express from "express"
import { Kafka } from "kafkajs"
import connectDb from "./src/db/connect.db";
import routes from "./src/routes/payment.routes"
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)

const PORT = 8000
connectDb.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Payment service started on port ${PORT}`);

    })
}).catch((err) => {
    console.log(err);
})

export default app