import express from 'express'
import mongoose from 'mongoose'
import swagger from 'swagger-ui-express'


const app = express()



app.use(express.json())
const USERS: { name: string, salary: number }[] = []

app.get("/", (req, res) => {
    console.log(req.query.name);

    setTimeout(() => {
        res.status(200).json({ message: "Fetch success", USERS: USERS })
    }, 1000);
})

app.post("/", (req, res) => {
    const { name, salary } = req.body as { name: string, salary: number }
    USERS.push({ name, salary })
    res.status(201).json({ message: "User created success" })
})



// swagger.serveWithOptions({})
app.use("/api", swagger.serve, swagger.setup(require("./swagger-output.json"), {
    swaggerOptions: {
        supportedSubmitMethods: []
    }
}))




app.listen(3000, () => {

    console.log("SERVER RUNNING ON 3000")
})