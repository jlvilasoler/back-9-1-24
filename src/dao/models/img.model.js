import mongoose from "mongoose";

const imageCollection = "images";

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

const imageModel = mongoose.model(imageCollection, imageSchema);
export { imageModel };