const { Kafka } = require('kafkajs')


const kafka = new Kafka({ brokers: ["192.168.0.116:9092"] });


const consumer = kafka.consumer({ groupId: "test" });

const producer = kafka.producer();

(async () => {
    await consumer.connect();
    console.log("consumer connected --------------------------------------------");

    await consumer.subscribe({ topic: "pro", fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ message, topic }) => {
            console.log("Message logged");
            console.log(topic);
            console.log(message.value.toString());
        }
    })
})()






const produce = async () => {
    await producer.connect()
    await producer.send({ messages: [{ value: "Hello i am rahul" }], topic: "pro" });
    console.log("message produced");

    await producer.disconnect()
}



setTimeout(async () => {
    await produce();
}, 1000)