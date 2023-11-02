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
                    (elemento) =>  elemento.product ? elemento.product.toString() === pid : false
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

