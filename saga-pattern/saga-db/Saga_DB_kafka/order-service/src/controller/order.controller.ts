import { Request, Response } from "express";
import { Order_Info } from "../models/order_info.model";
import { Kafka } from "kafkajs";
import producer from "../../../kafka-handler/kafka.producer"

const kafka = new Kafka({ clientId: "order_producer", brokers: ["localhost:29092"] });
const consumer = kafka.consumer({ groupId: "order-group" })
// const producer = kafka.producer();

// const connectProducer = async () => {
//   try {
//     await producer.connect();
//     console.log("Kafka producer connected successfully");
//   } catch (error) {
//     console.error("Failed to connect Kafka producer:", error);
//   }
// };

// connectProducer();

const createOrder = async (req: Request, res: Response) => {
  console.log(req.body);

  const order_details: Order_Info = req.body;
  const topic: string = "order_requested"

  try {
    await producer.runProducer(topic, order_details);
    await consumer.connect();
    console.log("connected");

    await consumer.subscribe({ topics: ["user_payment_success", "user_payment_failed"] })

    await consumer.run(({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("topic", topic);

        if (topic == "user_payment_success") {
          const payment_info = message.value?.toString()

          if (payment_info) {
            const payment_details = JSON.parse(payment_info)
            const data = JSON.parse(payment_details)

            consumer.disconnect()
            res.status(200).json({ message: "Order Placed Successfully", payment_info: data });
          }
        }

        if (topic == "user_payment_failed") {

        }
      }
    }))


  }
  catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
  finally {
    // console.log("didconnected order consumer");

    // consumer.disconnect()
  }
};

export default { createOrder };
