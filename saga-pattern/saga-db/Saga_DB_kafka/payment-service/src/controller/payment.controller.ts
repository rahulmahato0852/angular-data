import { Request, Response } from "express";
// import consumer from "../../../kafka-handler/kafka.consumer"
import { Kafka } from "kafkajs"
import { Payment_info } from "../models/payment.model";
import producer from "../../../kafka-handler/kafka.producer"
import { json } from "stream/consumers";
import circuitbreaker from "../../../circuit-braker/app"

const kafka = new Kafka({ clientId: "payment_service", brokers: ['localhost:29092'] })
const consumer = kafka.consumer({ groupId: "payment_group" })

const executePayment = async (req: Request, res: Response) => {

    await circuitbreaker.breaker.fire("my data")

    await consumer.connect();
    await consumer.subscribe({ topics: ["execute_payment"], fromBeginning: true })

    await consumer.run(({
        eachMessage: async ({ topic, partition, message }) => {
            let orderDetails: Payment_info

            const messageValue = await message.value?.toString();

            // await circuitbreaker.breaker.fire(messageValue)

            if (messageValue) {
                orderDetails = await JSON.parse(messageValue)
                console.log(`Payment request is received for Customer: ${orderDetails?.customerName}`)
            }

            try {
                const payment_details: Payment_info = req.body
                const topic: string = "payment_success"
                producer.runProducer(topic, payment_details)
                console.log("payment request success in payment service");

                consumer.disconnect();
                res.send({ status: "success" })


            } catch (error) {

                const topic: string = "payment_failed"
                producer.runProducer(topic, JSON.stringify({ status: "Payment_failed" }))

            }
            finally {
                consumer.disconnect()
            }
        }
    }))

}

export default { executePayment }