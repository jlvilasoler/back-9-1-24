import CartRepository from "../repository/CartRepository.js";
import { CartManager } from "../dao/database/cartManager.js";

const cartRepository = new CartRepository();
const CM = new CartManager();

//Tomar carritos - okok
export const getAllCartsService = async (id) => {
    try {
        const docs = await cartRepository.getCartRepository(id);
        return docs;
    } catch (error) {
        console.log(error);
    }
};

//Añadir carrito - okok
export const addCartService = async (cart) => {
    try {
        const newCart = await cartRepository.postRepository(cart);
        return newCart.id;
    } catch (error) {
        throw error;
    }
};

//Filtrar carrito por id - okok
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


export const getProductsInCartService = async (id) => {
    try {
        const docs = await cartRepository.addProductToCartId(id);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};


// ACTUALIZA CARRITO POR CANT
export const updateProductQuantityService = async (cid, pid, quantity) => {
    try {
        const docs = await CartRepository.updateProductQuantity(cid, pid, quantity);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};



//DELETE PRODUCT FROM CART
export const deleteProductFromCartService = async (cid, pid) => {
    const result = await CM.deleteProductRepository(
        { _id: cid },
        { $pull: { products: { _id: pid } } },
        { new: true }
    );

    if (result) {
        console.log('Product removed from the cart');
    } else {
        console.log('Product not found in the cart');
    }
};

//DELETE CART
export const deleteCartService = async (cid) => {
    try {
        const docs = await CM.deleteCart(cid);
        return docs;
    } catch (error) {
        console.error('Error deleting cart service:', error);
        throw error;
    }
};



export const getCartByIdServ = async (id) => {
    try {
        const docs = await CM.getCartById(id);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};


// Vaciar carrito
export const emptyCartService = async (cid) => {
    try {
        const cartFind = await CM.getCartById({ _id: cid });

        if (!cartFind) {
            console.log("Cart not found");
        }
        cartFind.products = [];
        await cartFind.save();
    } catch (error) {
        console.log('Error when emptying cart ', error);
    }
};
