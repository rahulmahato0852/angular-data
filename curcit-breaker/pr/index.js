const express = require('express')
const axios = require('axios')
const opposum = require("opossum")



async function asynFunction() {
    return await axios.get("https://jsonplaceholder.typicode.com/todos/1")
}




const app = express()


const cb = new opposum(asynFunction, { resetTimeout: 3000, timeout: 250, });


cb.fire().then((data) => {
    console.log(data.data);
}
).catch((err) => {
    console.log(err);
});

cb.on("open", () => {
    console.log("CURCIT IS NOW OPEN")
}
)
cb.on("close", () => {
    console.log("CURCIT IS NOW CLOSE")
}
)


// app.get("/", (req, res) => {
//     res.status(200).json({ message: "Fetch success" })
// })




app.listen(3000, () => {
    console.log("SERVER RUNNING ON 3000");
})

