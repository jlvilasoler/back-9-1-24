import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema( {
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    cartId: {
        type: Number,
    },
    role: {
        type: String,
    }
});

const userModel = mongoose.model(userCollection, userSchema);
export { userModel };   