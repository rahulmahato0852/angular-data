const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({})

const app = express()
const PORT = process.env.PORT || 7000

const User = mongoose.model("user", new mongoose.Schema({
    name: String
}))



app.use('/', async (req, res) => {
    await User.create({ name: req.body.name })
    const result = await User.find()
    res.status(200).json({ message: "SERVER RUNNING USING DOCKER", result })
})

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase")

mongoose.connection.once('open', () => {

    console.log("Mongoose connected");
    app.listen(PORT, console.log('SERVER RUNNING on ' + PORT)
    )
})
