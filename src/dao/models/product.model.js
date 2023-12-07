import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import validator from 'validator';

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    thumbnail: { type: String },
    code: { type: Number },
    stock: { type: Number },
    status: { type: String },
    category: { type: String },
    owner: {
        type: String,
        default: 'admin',
        validate: {
            validator: validateEmailOrAdmin,
            message: 'Invalid email format',
            isAsync: false,
        },
    },
});

function validateEmailOrAdmin(value) {
    return value === 'admin' || validator.isEmail(value) || mongoose.Types.ObjectId.isValid(value);
}

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);
export default productModel;