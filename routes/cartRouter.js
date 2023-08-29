import { Router } from "express";
import Carts from "../src/cartManager.js";

const cart = new Carts();
const router = Router();

const newCart = {id: 0 , products: []}

router.post('/cart/', async (req, res) => {
    await cart.addProductCart(newCart)
    res.send("Producto agregado al carrito")
});


// En la ruta GET, devuelve el array de productos que hay en el carrito OK
router.get('/cart', async (req, res) => {
    const readCart = await cart.getCarts();
    res.send(readCart);
});


// En la ruta GET, devuelve el array de productos que hay en el carrito
router.get('/cart/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid, 10);
        const cartItems = await cart.getCarts(); // Obtener todos los productos del carrito
        const busquedaCid = cartItems.find((prod) => prod.id === cid);

        if (busquedaCid) {
            res.send(busquedaCid); // Devolver todos los productos del carrito
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// En la ruta POST, debe agregar un nuevo producto
router.post('/cart/:cartId/addProduct', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cartId);
        const { product, quantity } = req.body;

        // Asegúrate de que `product` sea un objeto que contenga al menos `productId`, `name` y `price`
        if (!product || !product.productId || !product.name || !product.price) {
            throw new Error("El objeto de producto es inválido.");
        }

        await cart.addProductsToCart(cartId, product, quantity);
        res.json({ message: "Producto agregado al carrito correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;