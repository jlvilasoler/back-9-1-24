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
        const cart = await cartModel.findOne({ _id: id });
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
        let item = cart.products.find((p) => p.product.toString() === productId); 
        console.log(productId);
        if (item) { 
            item.quantity++; 
        } else { 
            item = { product: productId, quantity: 1 }; 
            console.log(item);
            cart.products.push(item);
        } 
        console.log(cart._id)
        console.log(cart);
        await cart.save();
        return item;
    }



    // Eliminando un producto del carrito
    async deleteProductFromCart(cid, pid) {
        try {
            console.log(`Deleting product ${pid} from cart ${cid}`);
            const cart = await this.getCartById(cid);

            const itemIndex = cart.products.findIndex((product) => product.product.toString() === pid);

            if (itemIndex !== -1) {
                // Si se encuentra el producto en el carrito, eliminarlo
                cart.products.splice(itemIndex, 1);
            } else {
                console.log(`Product with id ${pid} not found in cart.`);
            }

            console.log(`Cart after deleted product: ${(cart)}`);
            await cart.save();
            return pid;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await cartModel.findById(cid);
            console.log(cart, "CARRITO ENCONTRADO")
            if (!cart) {
                throw new Error("Cart not found");
            }

            const productToUpdate = cart.products.find(
                (product) => product.toString() === pid
            ); console.log(productToUpdate, "PRODUCTO ENCONTRADO")
            if (!productToUpdate) {
                throw new Error("Product not found in cart");
            }

            productToUpdate.quantity = quantity;
            await cart.save();

            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        const cart = await cartModel
            .findById(id)
            .populate("products.product")
            .lean();
        return cart;
    }


}

