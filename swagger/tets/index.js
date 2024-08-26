const express = require('express')
const swagger = require('swagger-ui-express')
const swaggerDoc = require('./swagger-output.json')
const app = express()



app.use("/api", swagger.serve, swagger.setup(swaggerDoc))


app.get('/ass', (req, res) => {

    res.status(200).json({ message: "Server started and running" })
})


app.listen(5000, console.log("SERVER RUNNING"))