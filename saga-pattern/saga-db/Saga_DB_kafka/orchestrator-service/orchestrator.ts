import { Kafka, EachMessagePayload } from 'kafkajs';
import producer from "../kafka-handler/kafka.producer";
import circuitbreaker from "../circuit-braker/app"

const kafka = new Kafka({
  clientId: 'orchestrator-service',
  brokers: ['localhost:29092']
});

// const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'orchestrator-group' });

export const init = async () => {
  try {
    console.log("Consumer connection started");

    await consumer.connect();
    console.log("Consumer connected successfully");

    await consumer.subscribe({ topics: ['order_requested', "payment_success", "Payment_failed"], fromBeginning: true });
    console.log("Subscribed to topic");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        console.log(`Current topic: ${topic}`);

        if (topic == "order_requested") {
          // const data = await message.value
          console.log("ORDER REQUESTED ------------");

          const messageValue = await message.value?.toString();
          let orderDetails: any;
          if (messageValue) {
            orderDetails = JSON.parse(messageValue)
          }
          console.log(`Order has been received to orchestrator customer name: ${orderDetails.customerName}`);

          const topic: string = "execute_payment"
          producer.runProducer(topic, messageValue)
        }

        if (topic == "payment_success") {
          const messageValue = await message.value?.toString()
          let paymentDetails: any;
          if (messageValue) {
            paymentDetails = JSON.parse(messageValue)
          }
          console.log(`Payment success for customer: ${paymentDetails.customerName}`);

          const topic: string = "user_payment_success"
          producer.runProducer(topic, messageValue)
        }

        if (topic == "Payment_failed") {

          const topic: string = "user_payment_failed"
          producer.runProducer(topic, JSON.stringify({ status: "Failed!!!!" }))
        }
      },
    });
  } catch (error) {
    console.error("Error in consumer:", error);
  }
  finally {
    // console.log("disconnected");

    // consumer.disconnect()
  }
};

// Initialize the consumer
init();
