import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema( {
    number: { type: Number },
    purchaser: { type: String,
    ref: "users" },
    purchase_datetime: { type: Date, default: Date.now },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export default ticketModel;