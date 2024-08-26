// kafkaClient.js
const { Kafka } = require('kafkajs');
const express = require('express')

// Create a new Kafka client
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
});

// Create a producer
const producer = kafka.producer();

// Create a consumer
const consumer = kafka.consumer({ groupId: 'test-group' });

(async () => {
    // Connect the producer
    await producer.connect();

    // Connect the consumer
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    // Start consuming messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message: ${message.value.toString()}`);
        },
    });

    // Send a message
    await producer.send({
        topic: 'test-topic',
        messages: [{ value: 'Hello Kafka' }],
    });

    console.log('Message sent and consumer running...');
})().catch(console.error);




const app = express()
app.get("/", async (req, res) => {
    await producer.send({
        topic: 'test-topic',
        messages: [{ value: 'Hello Kafka' }],
    });

    res.status(200).json({ message: "Server running with docker " })
})


app.listen(3000, console.log("SERVER RUNNING ON 3000")
)