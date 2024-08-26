import { Kafka } from 'kafkajs';
import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS, PAYMENT_FAILED, PAYMENT_REQUEST, PAYMENT_SUCCESS } from '../topics';
import { produceMessage } from '../kafka/kafka';


const kafka = new Kafka({ brokers: ["localhost:29092"], });


const consumer = kafka.consumer({ groupId: "orchestator-client-id" });

(async () => {

    await consumer.connect();
    await consumer.subscribe({ topics: [ORDER_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILED], fromBeginning: false });
    await consumer.run({
        eachMessage: async ({ message, topic }) => {
            console.log("ORCHESTATOR-TOPIC RUN =>=>", topic);
            const data = JSON.parse(message.value?.toString()!)
            if (topic === ORDER_REQUEST) {
                console.log("PAYMENT REQUEST PRODUCING");
                await produceMessage(data, PAYMENT_REQUEST)
                console.log("PAYMENT REQUEST PRODUCED");
            } else if (topic === PAYMENT_SUCCESS) {
                console.log("PAYMENT SUCCESS PRODUCING");
                await produceMessage(data, ORDER_SUCCESS);
                console.log("PAYMENT SUCCESS PRODUCED");
            } else if (topic === PAYMENT_FAILED) {
                console.log("PAYMENT Failed PRODUCING");
                await produceMessage(data, ORDER_FAILED)
                console.log("PAYMENT FAILED PRODUCED");
            }
        }
    })
})();



