const express = require('express')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config({
    path: "./.env"
})
const PORT = 3000


const User = mongoose.model("users", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
}, { timestamps: true }))



const app = express()
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}))
app.use(express.json())

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "All Fileds are required" })
    }
    const result = await User.findOne({ email });
    if (!result) {
        return res.status(400).json({ message: "User not found with this email" })
    }
    if (result.password !== password) {
        return res.status(400).json({ message: "Wrong password" })
    }
    res.cookie("user", result._id)
    res.status(200).json({ message: "Login Success", result: { name: result.name, email: result.email, password: result.password, mobile: result.mobile } })
})


app.post("/register", async (req, res) => {
    const { email, password, name, mobile } = req.body
    if (!email || !password || !mobile || !name) {
        return res.status(400).json({ message: "All Fileds are required" })
    }
    const result = await User.findOne({ email })

    if (result) {
        return res.status(400).json({ message: "User Alredy register with us" })
    }
    await User.create({ name, email, password, mobile })
    res.status(200).json({ message: "Regsiter success" })
})



app.use("*", (req, res) => {
    console.log("RESOURCE NOT FOUND");
    res.status(404).json({ message: "Resource not found" })
})


mongoose.connect("mongodb://localhost:27017/micorservice-test-1")



mongoose.connection.once('open', () => {
    console.log("MONGOOSE CONNECTED")
    app.listen(PORT, console.log("SERVER RUNNING"))
})





