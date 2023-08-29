import { Router } from "express";
const router = Router();


import ProductManager from "../src/productManager.js";
const products = new ProductManager("../src/productManager.json");
import CartManager from "../src/cartManager.js";
const cart = new CartManager("../src/cart.json");



const newCart = {id: 0 , products: []}


// En la ruta GET, devuelve el array de productos que hay en el carrito - OK
router.get('/cart', async (req, res) => {
    const readCart = await cart.getCarts();
    res.send(readCart);
});

//GET 1
router.post('/cart/:cid', async (req, res) => {
        const cid = parseInt(req.params.cid, 10);
        const cartId = await cart.getCartById(cid);
        if (!cartId) {
            res.status(404).send("Cart not found");
        } else {
            res.send(cartId.products);
        }});
        /*
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});*/








//3
router.post('/cart/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cartId);
        const { product, quantity } = req.body;

        // Asegúrate de que `product` sea un objeto que contenga al menos `productId`, `name` y `price`
        if (!product || !productcartId || !product.name || !product.price) {
            throw new Error("El objeto de producto es inválido.");
        }

        await cart.addProductCart(cartId, product, quantity);
        res.json({ message: "Producto agregado al carrito correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/cart/', async (req, res) => {
    await cart.addProductsToCart(newCart)
    res.send("Producto agregado al carrito")
});



// En la ruta GET, devuelve el array de productos que hay en el carrito - NO ANDA
router.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid, 10);
        const cartItems = await cart.getCarts(); // Obtener todos los productos del carrito
        const busquedaId = cartItems.find((prod) => prod.id === cid);

        if (busquedaId) {
            res.send(busquedaId); // Devolver todos los productos del carrito
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





// En la ruta POST, debe agregar un nuevo producto
router.post('/cart/:cartId', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cartId);
        const { product, quantity } = req.body;

        // Asegúrate de que `product` sea un objeto que contenga al menos `productId`, `name` y `price`
        if (!product || !productcartId || !product.name || !product.price) {
            throw new Error("El objeto de producto es inválido.");
        }

        await cart.addProductCart(cartId, product, quantity);
        res.json({ message: "Producto agregado al carrito correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

