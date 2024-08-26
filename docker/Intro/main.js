const express = require('express')
require('dotenv').config({ path: "./.env" })


const app = express()
const PORT = process.env.PORT || 6000

app.use("/", (req, res) => {
    res.status(200).json({ message: "Fetch success" })
})


app.listen(PORT, console.log("server running on " + PORT))