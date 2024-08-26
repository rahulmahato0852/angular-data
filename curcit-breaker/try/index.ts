import { Request, Response } from "express"

const express = require('express')


const app = express()

app.get("/", (req: Request, res: Response) => {
    setTimeout(() => {
        res.status(200).json({ message: "dATA FROM TS fetched success" })
    }, 2000);
})


app.listen(1000, () => {
    console.log("server runing on 1000");

})