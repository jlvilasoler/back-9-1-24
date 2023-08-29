import fs from "fs";

export default class ShoppingCart {
    constructor() {
        this.item = [];
        this.cart = "./src/cart.json";
    }

    async getCarts() {
        const data = JSON.parse(await fs.promises.readFile(this.cart, "utf-8"));
        return data;
    }

    async getIdCart() {
        let data = await this.getCarts();
        return data.length + 1;
    }

    async addCart(newCart) {
        newCart.id = await this.getIdCart();
        let data = await this.getCarts();
        data.push(newCart);
        await fs.promises.writeFile(this.cart, JSON.stringify(data));
    }

    async getCartById(id) {
        let Cart = await this.getCarts();
        let cartfinder = Cart.find((cart) => cart.id === id);
        return cartfinder;
    }

    async addProductsToCart(pid, cid, product) {
        try {
            const carts = await this.getCarts();
            const selectCart = carts[cid - 1];

            if (selectCart) {
                const cartProduct = selectCart.products || [];
                const findProd = cartProduct.find((prod) => prod.id === pid);

                findProd ? findProd.quantity++ : cartProduct.push({ ...product, id: pid, quantity: 1 });

                await fs.promises.writeFile(this.cart, JSON.stringify(carts));
            } else {
                console.log('Error not found');
            }
        } catch (error) {
            console.log('There was an error adding the product', error)
        }
    }
}


