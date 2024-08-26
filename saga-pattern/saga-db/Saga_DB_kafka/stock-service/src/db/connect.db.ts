import mongoose from "mongoose";
import models from "../models/stocks.model"

models.StocksModel

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Saga")
        console.log(`DB connected successfully to host ${mongoose.connection.port}`);
        
    } catch (error) {

        console.log(`An error occured while connecting to db: ${error}`);
        
        
    }
}

export default {connect}