import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

export class CartManager {
    async getAllCarts() { //OK FUNCIONA
        try {
            const carts = await cartModel.find().lean();
            return carts;
        } catch (error) {
            console.error('Error while fetching cart by ID', error);
            errorHandler();
        }
    }


    async addCart(cart) {//OK FUNCIONA
        try {
            const newCart = await cartModel.create(cart);
            return newCart.id;
        } catch (error) {
            console.error('Error while fetching cart by ID', error);
            errorHandler();
        }
    }

    async getCartById(id) {//OK FUNCIONA
        try {
            const cart = await cartModel.findById(id);
            if (!cart) {
                console.warn(`No cart found for ID: ${id}`);
                return null; // o lanza un error según tus requisitos
            }
            return cart;
        } catch (error) {
            console.error('Error while fetching cart by ID', error);
            // Llama al middleware de error para manejar el error
            errorHandler();
        }
    }

    async getProductsInCart(cartId) {
        try {
            const cart = await this.getCartById(cartId);
            if (cart) {
                return cart.products;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error while fetching cart by ID', error);
            errorHandler(error, null, null, null);
        }
    }

    async addProductToCartId(cid, pid) {
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
                            productId: pid,
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
            //console.log()error);
        }
    }



    // Eliminando un producto del carrito
    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await this.getCartById(cid);

            const itemIndex = cart.products.findIndex((product) => product.product.toString() === pid);
            if (itemIndex !== -1) {
                // Si se encuentra el producto en el carrito, eliminarlo
                cart.products.splice(itemIndex, 1);
                await cart.save();
                return pid;
            } else {
                //console.log()`Product with id ${pid} not found in cart.`);
                return null; // o puedes lanzar un error si lo prefieres
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    //DELETE CART
    async deleteCart(cid) {
        try {
            const findCart = await cartModel.findById(cid);
console.log(findCart)
            if (findCart) {
                cartModel.findById = [];
                await findCart.save();
                return findCart;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error deleting cart:', error);
            throw error;
        }
    };


//ACTUALIZA CANT PROD EN CARRITO
async updateProductQuantity(cid, pid, quantity) {
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const productToUpdate = cart.products.find(
            (product) => product._id.toString() === pid
        );
        if (!productToUpdate) {
            throw new Error("Product not found in cart");
        }
        // Actualiza la cantidad del producto
        productToUpdate.quantity = quantity;
        await cart.save();
        // Devuelve el carrito actualizado
        return cart;
    } catch (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }
}

    async getCartById(id) {
        try {
            const cart = await cartModel
                .findById(id)
                .populate("products.product")
                .lean();
            return cart;
        } catch (error) {
            //console.log()error);
        }
    }


}

