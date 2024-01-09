import mongoose from "mongoose";

const userCollection = "users";



const documentSchema = new mongoose.Schema({
    name: { type: String },
    reference: { type: String }
})

const connectionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    action: { type: String, enum: ["login", "logout"], required: true }
})



const userSchema = new mongoose.Schema( {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "tickets"},
    age: { type: Number },
    password: { type: String },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, default: 'user' },
    documents: [documentSchema],
    last_connection: [connectionSchema],
});

const userModel = mongoose.model(userCollection, userSchema);
export { userModel };