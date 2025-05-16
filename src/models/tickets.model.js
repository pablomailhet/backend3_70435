import { Schema, model } from "mongoose";

const ticketCollection = "ticket";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    },
    products: {
        type: Object
    }
})

const ticketModel = model(ticketCollection, ticketSchema);

export default ticketModel;