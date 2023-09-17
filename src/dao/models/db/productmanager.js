import { productModel } from "../product.model.js";

class productManager {
    async create(title, description, price, thumbnail, code, stock, status, category) {
        const product = await productModel.create({
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock, 
            status, 
            category
        });
        return product;
    }
}

export default productManager;