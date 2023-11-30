import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import errorHandler from "../../middlewares/errorHandler.js";

export default class CartManager {
    //GET ALL CARTS
    async getAllCarts() {
        try {
            const carts = await cartModel.find().lean();
            return carts;
        } catch (error) {
            errorHandler();
        }
    }

    //ADD CART
    async addCart(cart) {
        try {
            const newCart = await cartModel.create(cart);
            return newCart.id;
        } catch (error) {
            errorHandler();
        }
    }

    //GET CART BY ID
    async getCartById(id) {
        try {
            const cart = await cartModel.findById(id);
            if (!cart) {
                return null;
            }
            return cart;
        } catch (error) {
            errorHandler();
        }
    }

    //UPDATE QUANTITY ON CART
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

    //DELETE CART BY ID 
    async deleteCart(cid) {
        try {
            const cart = await cartModel.findByIdAndDelete(cid);
            if (cart) {
                res.send(cart)
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).send("error deleting cart");
            next(error)
        }
    }


    // ADD PROD TO CART
    async addProductToCartId(cid, pid) {
        try {
            const findCart = await cartModel.findById(cid);
            const findProduct = await productModel.findById(pid);

            if (!findProduct) {
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

// DELETE PRODUCT FROM CART (WITH_ID)
    async deleteProductFromCart(cid, pid) {
        const cart = await this.getCartById(cid);
        const itemIndex = cart.products.findIndex((product) => product.product.toString() === pid);

        if (itemIndex !== -1) {
            // Si se encuentra el producto en el carrito, eliminarlo
            cart.products.splice(itemIndex, 1);
        } else {
            return null; // o puedes lanzar un error si lo prefieres
        }

        await cart.save();
        return pid;
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

