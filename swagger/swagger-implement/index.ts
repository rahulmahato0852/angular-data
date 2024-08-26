import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import swagger from 'swagger-ui-express'
import op from './swagger-output.json'
const app = express();

express.json();


app.use("/api/123", swagger.serve, swagger.setup(op));

app.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params
    res.status(200).json({ message: "Fetch success", id });;
});

app.listen(3000, () => {
    console.log("SERVER RUNNING ON 3000");;
});;





