import cartModel from "../dao/models/cart.model.js";
import productModel from "../dao/models/product.model.js";

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
/////
async addProductToCart(cid, pid) {
    try {
    const findCart = await cartModel.findById(cid);
    const findProduct = await productModel.findById(pid);

    if (!findProduct) {
        throw new Error(`The requested product id ${pid} doesnt exist!`);
    } else {
        if (findCart) {
        const productExist = findCart.products.find(
            (elemento) => elemento.product ? elemento.product.toString() === pid : false
        );
        if (!productExist) {
            const newProd = {
            quantity: 1,
            product: pid,
            };
            findCart.products.push(newProd);
        } else {
            const indexProduct = findCart.products.findIndex(
                (elemento) => elemento.product ? elemento.product.toString() === pid : false
            );
            findCart.products[indexProduct].quantity += 1;
        }
        await findCart.save();
        return findCart;
        } else {
        throw new Error("The cart you are searching for does not exist!");
        }
    }
    } catch (error) {
    console.log(error);
    }
}

// DELETE PRODUCT FROM CART (WITH_ID)
async deleteProductfromCartRepository(cid, pid){
    try {
        const data = await cartModel.findOneAndUpdate(cid, pid);
        return data;
    } catch (error) {
        console.error("error delete product", error);
        throw error;
    }
}
};