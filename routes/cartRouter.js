import { Router } from "express";
import CartManager from "../src/dao/database/cartManager.js";
import ProductManager from "../src/dao/database/productManager.js"; // X

import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";


const cartManager = new CartManager();
const productManager = new ProductManager("../../products.json");
const router = Router();


// En la ruta POST, Crear nuevo carrito (va creando un cartId automatico, según el addCart)
router.post('/cart/', privateRoutes, async (req, res) => {
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
router.get('/cart/', privateRoutes,  async (req, res) => {
    try {
        const allCarts = await cartManager.getAllCarts();
        res.json(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// En la ruta GET, Listado de productos según carrito
router.get('/cart/:cid', privateRoutes,  async (req, res) => {
    try {
        const cartId = req.params.cid;
        const products = await cartManager.getProductsInCart(cartId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// En la ruta POST, Agregar pid a cart segun su cid
router.post('/cart/:cid/products/:pid', privateRoutes,  async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;

        if (quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be more than 0' });
        }

        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        } console.log
        const product = await productManager.getProductById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await cartManager.addProductToCartId(cid, pid, quantity);
        res.json({ message: 'New product added to cart!', productId: pid, cartId: cid });

    } catch (error) {
        console.error('Error adding product to cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// En la ruta DELETE, Elimina pid a un cart segun su cid
router.delete('/cart/:cid/products/:pid', privateRoutes,  async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;

        if (quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be more than 0' });
        }

        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        } console.log
        const product = await productManager.getProductById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await cartManager.deleteProductFromCart(cid, pid, quantity);
        res.json({ message: 'Product deleted from cart!', productId: pid, cartId: cid });

    } catch (error) {
        console.error('Error adding product to cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// En la ruta DELETE, Eliminar todos los productos de un cart
router.delete('/cart/:cid', privateRoutes,  async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId); // Buscamos el carrito 
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }


        cart.products = []; //si hay carrito se deja en cero [] )
        await cart.save(); //guarda el carrito en cero unidades
        return res.json({ message: 'All products removed from cart' });
    
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// En la ruta PUT, debe actualizar el carrito
router.put('/cart/:cid', privateRoutes,  async (req, res) => {
    try {
        const cartId = req.params.cid; // obtenemos el valor cid de la url y lo almacenamos
        const updatedCartData = req.body; // Datos actualizados del carrito

        // Buscar y obtener el documento de carrito específico en la base de datos
        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Actualizar los campos relevantes del carrito con los datos proporcionados
        if (updatedCartData.products) {
            cart.products = updatedCartData.products;
        }
        await cart.save(); // guarda el carrito

        res.json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





// En la ruta PUT, debe actualizar solo la cantidad de ejemplares del carrito
router.put('/cart/:cid/products/:pid', privateRoutes, async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    console.log('pid:', pid);


    const cart = await cartManager.getCartById(cid);
    console.log('Cart:', cart);


    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    } console.log(cart);


    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }console.log();

    await cartManager.updateProductQuantity(cid, pid, quantity);
    console.log(quantity);
    res.json({ message: 'Product quantity modified!', productId: pid, cartId: cid });
});






export default router;