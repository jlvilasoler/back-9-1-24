import fs from "fs";

export default class CartManager {
    constructor(path) {
        this.path = path;
        this.loadCarts();
    }

    // busca los carritos que hay guardados
    getAllCarts() {
        return this.carts;
    }

    // se cargan los carritos
    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            console.log("Error loading carts:", error.message);
            this.carts = []; 
        }
    }

    // guarda la informacion de los carritos de compras en un archivo en el disco
    saveCarts() {
        try {
            const data = JSON.stringify(this.carts, null, 2)
            fs.writeFileSync(this.path, data, "utf-8");
        } catch (error) {
            console.log("Saving cart error", error.message);
        }
    }

    // Agrega un nuevo carrito
    addCart(cart) {
        const newCart = { ...cart };
        if (this.carts.length === 0) {
            newCart.id = 1;
        } else {
            newCart.id = this.carts[this.carts.length - 1].id + 1;
        }
        this.carts.push(newCart);
        this.saveCarts();
        return newCart.id;
    }

    // busca un carrito en la lista de carritos
    getCartById(id) {
        return this.carts.find((cart) => cart.id === id);
    }

    // agrega un producto al carrito, agrega un producto a un carrito determinado, segun su Id
    addProductToCart(cartId, productId, quantity) {
        const cartIndex = this.carts.findIndex((cart) => cart.id === cartId);

        if (cartIndex !== -1) {
            const cartToUpdate = this.carts[cartIndex];
            const existingProduct = cartToUpdate.products.find((product) => product.productId === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cartToUpdate.products.push({ productId, quantity });
            }

            this.saveCarts();
        } else {
            console.log('Cart not found');
        }
    }

    // nos da la lista de productos del carrito 
    getProductsInCart(cartId) {
        const cart = this.getCartById(cartId);

        if (cart) {
            return cart.products;
        } else {
            console.log('Cart not found');
            return [];
        }
    }
}

