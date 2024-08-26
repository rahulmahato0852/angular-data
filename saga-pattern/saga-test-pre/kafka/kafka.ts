import { Kafka } from 'kafkajs';


const kafka = new Kafka({ brokers: ["localhost:29092"], clientId: "kafka-clientiD-for-kafka-dir" })
const producer = kafka.producer();


export const produceMessage = async (message: any, topic: string) => {
    await producer.connect();
    await producer.send({ messages: [{ value: JSON.stringify(message) }], topic });
    await producer.disconnect();
}

