import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-consumer',
    brokers: ['localhost:29092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });
const getFromConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topics: ['execute_payment'], fromBeginning: true });
    // const run = consumer.run()) 
    return await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message?.value?.toString(),
            });
        },
    });









    
};

export default { getFromConsumer }
// runConsumer().catch(console.error);
