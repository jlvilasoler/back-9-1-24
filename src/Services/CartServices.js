import CartRepository from "../repository/CartRepository.js";
import CartManager from '../dao/database/cartManager.js';
const cartRepository = new CartRepository();
const CM = new CartManager();

//GET ALL CARTS
export const getAllCartsService = async (id) => {
    try {
        const docs = await cartRepository.getCartRepository(id);
        return docs;
    } catch (error) {
        console.log(error);
    }
};

//FILTER CART BY ID
export const getCartByIdService = async (cid) => {
    try {
        const cart = await cartRepository.getIdRepository({ _id: cid });
        if (!cart) {
            console.warn(`No cart found for ID: ${cid}`);
            return null; // o lanza un error según tus requisitos
        }
        return cart;
    } catch (error) {
        console.error('Error while fetching cart by ID', error);
        throw error; // o maneja el error de acuerdo a tus necesidades
    }
};

//ADD CART
export const addCartService = async (cart) => {
    try {
        const newCart = await cartRepository.postRepository(cart);
        return newCart.id;
    } catch (error) {
        throw error;
    }
};

// REFRESH CART BY ID
export const updateProductQuantityService = async (cid, pid, quantity) => {
    try {
        const docs = await CartRepository.updateProductQuantity(cid, pid, quantity);
        return docs;
    } catch (error) {
        throw error;
    }
};

//DELETE CART BY ID _ 
export const deleteCartService = async (cid) => {
    try {
        const cart = await cartRepository.deleteRepository({ _id: cid });
        return cart;
    } catch (error) {
        console.log(error);
    }
};

//ADD PRODUCT FROM CART BY ID _ 
export const addProductToCartService = async (cid, pid) => {
    try {
        const cart = await cartRepository.addProductToCart(cid, pid);
        return cart;
    } catch (error) {
        console.log(error);
    }
};

// DELETE PRODUCT FROM CART (WITH_ID)
export const deleteProductOfCartService = async (cid, pid) => {
    try {
        const result = await cartRepository.deleteProductfromCartRepository(
            { _id: cid },
            { $pull: { products: { _id: pid } } },
            { new: true }
        );
        if (result) {
            console.log('Product removed from the cart');
        } else {
            console.log('Product not found in the cart');
        }
    } catch (error) {
        console.log('Error when removing product from cart', error);
    }
}















export const getProductsInCartService = async (id) => {
    try {
        const docs = await cartRepository.addProductToCartId(id);
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const getCartByIdServ = async (id) => {
    try {
        const docs = await CM.getCartById(id);
        return docs;
    } catch (error) {
        console.log(error);
    }
};


