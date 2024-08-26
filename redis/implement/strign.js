const client = require("./client");

async function init() {
    // await client.set("msg:0", "Hey I am zero number of message")
    // await client.expire("msg:0", 3)
    const result = await client.get("msg:0");
    console.log("Result  => ", result);

}


init();