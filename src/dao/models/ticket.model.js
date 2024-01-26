import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema( {
    amount: { type: Number },
    purchaser: { type: String,
    ref: "users", required: true },
    purchase_datetime: { type: Date, default: Date.now },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export default ticketModel;