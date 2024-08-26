import mongoose, { Document } from "mongoose";

export interface Stocks extends Document {

    productName: String
    quantity: Number

}
const StockSchema = new mongoose.Schema<Stocks>(({
    productName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
}), { timestamps: true })

const StocksModel = mongoose.model<Stocks>("stock_record", StockSchema)
export default { StocksModel }