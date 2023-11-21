import CartManager from "../dao/database/cartManager.js"
const CM = new CartManager();

export const getAllCartsService = async () => {
    try {
        const docs = await CM.getAllCarts();
        return docs;
    } catch (error) {
        //console.log()error);
    }
};

export const addCartService = async (cid) => {
    try {
        const docs = await CM.addCart(cid);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};

export const getCartByIdService = async (id) => {
    try {
        const docs = await CM.getCartById(id);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};


export const getProductsInCartService = async (id) => {
    try {
        const docs = await CM.addProductToCartId(id);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};



export const updateProductQuantityService = async (cid, pid, quantity) => {
    try {
        const docs = await CM.updateProductQuantity(cid, pid, quantity);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};



//DELETE PRODUCT FROM CART
export const deleteProductFromCartService = async (cid, pid) => {
    try {
        const docs = await CM.deleteProductFromCart(cid, pid);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};

//DELETE CART
export const deleteCartService = async (cid, pid) => {
    try {
        const docs = await CM.deleteCart(cid, pid);
        return docs;
    } catch (error) {
        //console.log()error);
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



