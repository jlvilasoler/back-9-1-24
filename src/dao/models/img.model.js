import mongoose from "mongoose";

const imgCollection = "images";

const imageSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
});

const imageModel = mongoose.model(imgCollection, imageSchema);
export { imageModel };