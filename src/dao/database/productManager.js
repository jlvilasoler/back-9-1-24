import { productModel } from "../models/product.model.js";
import CartManager from "./cartManager.js";

export default class ProductManager {

    async getProducts() {
        try {
        const products = await productModel.find({}).lean();
        //console.log()products);
        return products;
    } catch (error) {
        throw error;
    }
    }

    async getProductById(id) {
        try {
        const product = await productModel.find({ _id: id }).lean();
        return product;
    } catch (error) {
        throw error;
    }
    }

//VER
    async addProduct(id) {
        try {
            const product = await productModel.create({ _id: id });
            return product;
        } catch (error) {
            throw error;
        }
    }
    


    async updateProduct(id, obj) {
        try {
        await productModel.updateOne({ _id: id }, obj).lean();
        return obj;
    } catch (error) {
        throw error;
    }
    }


    async deleteProduct(id) {
        try {
            const products = await productModel.findByIdAndDelete(id);
            return products;
        } catch (error) {
            //console.log()error);
        }
    }

    











}