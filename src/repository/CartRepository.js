import { cartModel } from "../dao/models/cart.model.js";

export default class CartRepository {

    async getCartRepository() {
        try {
            const get = await cartModel.find({}).lean();
            return get;
        } catch (error) {
            console.error("error when taking carts", error);
            throw error;
        }
    }

    async getIdRepository(cid) {
        try {
            const cart = await cartModel.findOne(cid).lean();
            if (!cart) {
                console.warn(`No cart found for criteria: ${JSON.stringify(cid)}`);
                return null; // o lanza un error según tus requisitos
            }
            return cart;
        } catch (error) {
            console.error("Error when fetching cart by ID", error);
            throw error;
        }
    }
    
//ACTUALIZAR 
    async updateRepository(cid, updateData) {
        try {
            const data = await cartModel.updateOne(cid, updateData);
            return data;
        } catch (error) {
            console.error("error update cart", error);
            throw error;
        }
    }

    async postRepository(cart) {
        try {
            const add = await cartModel.create(cart);
            return add;
        } catch (error) {
            console.error("error add cart", error);
            throw error;
        }
    }

    async deleteProductRepository(cid,pid){
        try {
            const data = await cartModel.findOneAndUpdate(cid, pid);
            return data;
        } catch (error) {
            console.error("error delete product", error);
            throw error;
        }
    }

};

