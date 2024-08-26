const express = require("express")

const app = express()

app.use("/", require("./routes/user.routes"))

app.listen(3000, console.log("SERVER RUNNING"))