import { cartModel } from "../models/cart.model.js";

export default class CartManager {
    async getAllCarts() {
        const carts = await cartModel.find().lean();
        return carts;
    }

    async addCart(cart) {
        const newCart = await cartModel.create(cart);
        return newCart.id;
    }

    async getCartById(id) {
        const cart = await cartModel.findOne( {_id: id} );
        return cart;
    }

    async getProductsInCart(cartId) {
        const cart = await this.getCartById(cartId);

        if (cart) {
            return cart.products;
        } else {
            console.log('Cart not found');
            return [];
        }
    }

    async addProductToCartId(cid, productId) { 
        const cart = await this.getCartById(cid); 
        console.log(cart);

        let item = cart.products.find((p) => p.product === productId); 
        console.log(productId);
        if (item) { 
            item.quantity++; 
        } else { 
            item = { product: productId, quantity: 1 }; 
            console.log(item);
            cart.products.push(item); 
        } 
        console.log(cart);
        await cart.save(); 
        return item; 
    }



/////////////////////////////// Ultima Entrega
// Eliminando un producto del carrito
async deleteProductFromCart(cid, id) {
    try {
        console.log(`Deleting product ${id} from cart ${cid}`);
        const cart = await this.getCartById(cid);

        const itemIndex = cart.products.findIndex((product) => product._id.toString() === id);

        if (itemIndex !== -1) {
            // Si se encuentra el producto en el carrito, eliminarlo
            cart.products.splice(itemIndex, 1);
        } else {
            console.log(`Product with _id ${id} not found in cart.`);
        }

        console.log(`Cart after deleted product: ${(cart)}`);
        await cart.save();
        return id; // Devolvemos el _id del producto eliminado
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



async updateProductQuantity(cid, pid, quantity) { 
    try {
        const cart = await this.getCartById(cid);
        if (!cart) {
            throw new Error("Cart not found");
        }

            const findProd = cart.products.findIndex((product) => product._id.toString() === pid);

        if (!findProd) {
            throw new Error("Product not found in cart");
        }

        if (isNaN(quantity) || quantity < 0) {
            throw new Error("Invalid quantity value");
        }

        findProd.quantity = quantity;
        await cart.save();

        return cart;
    } catch (error) {
        console.log(error);
        throw error;
    }
}







/*

// Actualizando carrito 
async updateCart(cid, obj) {
    const updateCartResult = await cartModel.updateOne({ _id: cid }, obj).lean();
    if (updateCartResult.nModified === 1) {
        return obj;
    }
    return null;
}
*/







}

