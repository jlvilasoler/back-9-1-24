import { Router } from "express";
import CartManager from "../src/cartmanager.js";
import ProductManager from "../src/productManager.js";

const cartManager = new CartManager();
const productManager = new ProductManager("../../products.json");
const router = Router();


// En la ruta POST, Crear nuevo carrito (va creando un cartId automatico, según el addCart)
router.post('/cart/', async (req, res) => {
    try {
        const cart = { products: [] };
        const cartId = await cartManager.addCart(cart);
        res.status(201).json({ message: 'Cart created!', cartId });
    } catch (error) {
        console.error('Error creating cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// En la ruta GET, Lee todos los carritos guardados
router.get('/cart/', async (req, res) => {
    try {
        const allCarts = await cartManager.getAllCarts();
        res.json(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// En la ruta GET, Listado de productos según carrito
router.get('/cart/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid, 10);
        const products = await cartManager.getProductsInCart(cartId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// En la ruta POST, Agregar pid a cart segun su cid
router.post('/cart/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid, 10);
        const pid = parseInt(req.params.pid, 10);
        const quantity = req.body.quantity || 1;

        if (quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be more than 0' });
        }

        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const product = await productManager.getProductById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        cartManager.addProductToCart(cid, pid, quantity);
        res.json({ message: 'New product added to cart!', productId: pid, cartId: cid });

    } catch (error) {
        console.error('Error adding product to cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;