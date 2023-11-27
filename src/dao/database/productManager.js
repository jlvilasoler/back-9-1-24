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

    //ADD PRODUCT  _ funciona
    async addProduct(pid) {
        try {
            const newProduct = await productModel.create(pid);
            return newProduct.pid;
        } catch (error) {
            errorHandler();
        }
    }

        //UPDATE PRODUCT  _ funciona
    async updateProduct(pid, obj) {
        try {
            await productModel.updateOne({ _id: pid }, obj).lean();
            return obj;
        } catch (error) {
            throw error;
        }
    }
















}