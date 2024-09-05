import { log } from 'console';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:29092']
});

const producer = kafka.producer();

const runProducer = async (topic: string, data: any) => {
    console.log("Producer connection started");
    await producer.connect();







    console.log("Producer connected");
    console.log("My topic data ", topic, data);

    await producer.send({

        topic: topic,
        messages: [{ value: JSON.stringify(data) }]
    });
    console.log("success topic publish");

    await producer.disconnect();
};
const runProducer2 = async (topic: string, data: any) => {
    console.log("Producer connection started");
    await producer.connect();







    console.log("Producer connected");
    console.log("My topic data ", topic, data);

    await producer.send({

        topic: topic,
        messages: [{ value: JSON.stringify(data) }]
    });
    console.log("success topic publish");

    await producer.disconnect();
};

export default { runProducer }
// runProducer().catch(console.error);
