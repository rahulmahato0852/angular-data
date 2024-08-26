import { Kafka } from "kafkajs"


const kafka = new Kafka({ brokers: ["localhost:9092"], clientId: "kudsakjdsakjsakjsakjsakjkjs" });


const admin = kafka.admin();
export const consumer = kafka.consumer({ groupId: "consumer" });

(async () => {
    try {

        await admin.connect()
        await admin.createTopics({
            topics: [
                { topic: "order", numPartitions: 3, replicationFactor: 1 },
                { topic: "order-success", numPartitions: 3, replicationFactor: 1 },
                { topic: "order-failed", numPartitions: 3, replicationFactor: 1 },
                { topic: "payment-request", numPartitions: 3, replicationFactor: 1 },
                { topic: "payment-success", numPartitions: 3, replicationFactor: 1 },
                { topic: "payment-failed", numPartitions: 3, replicationFactor: 1 },
            ]
        })
        console.log("Topic created");

    } catch (error) {
        console.log("error on creating topic", error);
    }
    finally {
        await admin.disconnect()
    }
})()





export const producemesage = async ({ message, topic }: { message: any, topic: any }) => {
    const producer = kafka.producer();
    // const consumer = kafka.consumer({ groupId: "1212121" });

    await producer.connect()
    await producer.send({
        messages: [
            { value: JSON.stringify(message) },
        ],
        topic
    })
    await producer.disconnect();
}



