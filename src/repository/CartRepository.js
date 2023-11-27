import cartModel from "../dao/models/cart.model.js";

export default class CartRepository {

    //GET ALL CARTS
    async getCartRepository() {
        try {
            const get = await cartModel.find({}).lean();
            return get;
        } catch (error) {
            console.error("error when taking carts", error);
            throw error;
        }
    }

    //GET CART BY ID
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

    //ADD CART
    async postRepository(cart) {
        try {
            const add = await cartModel.create(cart);
            return add;
        } catch (error) {
            console.error("error add cart", error);
            throw error;
        }
    }

    //DELETE CART
    async deleteProductRepository(cid, pid) {
        const data = await cartModel.findOne(cid, pid);
        return data;
    }

    //UPDATE CART BY ID - OK
    async updateRepository(cid, updateData) {
        try {
            const updateProduct = await cartModel.updateOne(cid, updateData);
            return updateProduct;
        } catch (error) {
            console.error("error update cart", error);
            throw error;
        }
    };

    //DELETE CART BY ID
    async deleteRepository(cid) {
        try {
            const cart = await cartModel.deleteOne({ _id: cid });
            return cart;
        } catch (error) {
            console.error("error deleting cart", error);
            throw error;
        }
    }

////////////////////////////////


};