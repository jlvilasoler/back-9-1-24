import { productModel } from "../models/product.model.js";
import CartManager from "./cartManager.js";

export default class ProductManager {

    async getProducts() {
        const products = await productModel.find({}).lean();
        console.log(products);
        return products;
    }

    async getProductById(id) {
        const product = await productModel.find({ _id: id }).lean();
        return product;
    }

//VER
    async addProduct(id) {
        try {
            const product = await productModel.create({ _id: id });
            console.log("ssdsd")
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    


    async updateProduct(id, obj) {
        await productModel.updateOne({ _id: id }, obj).lean();
        return obj;
    }


    async deleteProduct(id) {
        try {
            const products = await productModel.findByIdAndDelete(id);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    











}