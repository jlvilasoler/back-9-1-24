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
        const cart = await cartModel.find( {_id: id} ).lean();
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
        console.log('Cart:', cart);

        let item = cart.products.find((p) => p.product == productId); 
        console.log('Item:', item);
        if (item) { 
            item.quantity++; 
        } else { 
            item = { product: productId, quantity: 1 }; 
            cart.products.push(item); 
        } 

        await cart.save(); 
        return item; 
    }
    
    }

