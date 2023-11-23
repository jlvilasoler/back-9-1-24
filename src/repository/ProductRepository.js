import productModel from "../dao/models/product.model.js";


export default class ProductRepository {

    // GET ALL _ funciona
    async getProductRepository() {
        try {
            const product = await productModel.find().lean();
            return product;
        } catch (error) {
            console.error("error getting products", error);
            throw error;
        }
    }

    //FILTER BY ID _ funciona
    async getProductIdRepository(pid) {
        try {
            const product = await productModel.findOne(pid).lean();
            return product;
        } catch (error) {
            console.error("error filtering product", error);
            throw error;
        }
    }

    //DELETE PROD BY ID _ funciona
    async deleteRepository(pid) {
        try {
            const product = await productModel.deleteOne({ _id: pid });
            return product;
        } catch (error) {
            console.error("error deleting product", error);
            throw error;
        }
    }














    //ADD PRODUCT _
    async postProductRepository(obj) {
        try {
            const addproduct = await productModel.create(obj);
            return addproduct;
        } catch (error) {
            throw error;
        }
    }
};


