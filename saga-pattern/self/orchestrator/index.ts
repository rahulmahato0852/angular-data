import { Kafka } from 'kafkajs';
import { consumer, producemesage } from '../kafka/producer';



(async () => {

    await consumer.subscribe({ topics: ["order", "payment-success", "payment-failed"], fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ message, topic }) => {
            console.log("tttttttttttttttttttttttttttttttttttttttttt", topic);
            console.log(typeof JSON.parse(message.value?.toString()!));
            if (topic === "order") {
                console.log("order consume success");
                await producemesage({ message: JSON.parse(message.value?.toString()!), topic: "payment-request" })
            } else if (topic === "payment-success") {
                await producemesage({ message: JSON.parse(message.value?.toString()!), topic: "order-success" })
            } else if (topic === "payment-failed") {
                await producemesage({ message: JSON.parse(message.value?.toString()!), topic: "order-failed" })
            } else {
                console.log(topic, "Topic not matched");
            }
        }
    })


})()


