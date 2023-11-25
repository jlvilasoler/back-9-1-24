import errorHandler from "../../middlewares/errorHandler.js";
import productModel from "../models/product.model.js";


export default class ProductManager {

    // GET ALL _ funciona
    async getProducts() {
        try {
            const products = await productModel.find({}).lean();
            if (products) {
                res.send(products)
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).send("error getting products");
            next(error)
        }
    }

    //FILTER BY ID _ funciona
    async getProductById(pid) {
        try {
            const product = await productModel.findById(pid);
            if (product) {
                res.send(product)
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).send("error filtering product");
            next(error)
        }
    }

    //DELETE PRODUCT BY ID _ funciona
    async deleteProduct(pid) {
        try {
            const product = await productModel.findByIdAndDelete(pid);
            if (product) {
                res.send(product)
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).send("error deleting product");
            next(error)
        }
    }

    //lo saque y sigue funcionando el codigo
/*
        //Add Product - okok
        async addProduct(pid) {
            try {
                const newProduct = await productModel.create(pid);
                return newProduct.pid;
            } catch (error) {
                errorHandler();
            }
        }
*/















    async updateProduct(id, obj) {
        try {
            await productModel.updateOne({ _id: id }, obj).lean();
            return obj;
        } catch (error) {
            throw error;
        }
    }
















}