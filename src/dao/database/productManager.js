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


    async addProduct(id, title, description, price, thumbnail, code, stock, status, category) {
        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
        };
        const repeatCode = await productModel.find({ code: newProduct.code });
        if (repeatCode.length > 0) {
            console.log("El codigo está repetido")
            return;
        }
        try {
            const products = await productModel.create(newProduct);
            return products;

        } catch (error) {
            console.log(error);
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