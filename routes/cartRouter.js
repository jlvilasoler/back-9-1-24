import { Router } from "express";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";

import { createCartController, getCartByIdController, getCartsController, addProductToCartController, updateAllCartController, deleteProductFromCartController, deleteCartController } from '../src/Controllers/CartController.js';
import { updateController } from "../src/Controllers/ProductController.js";

const router = Router();


// En la ruta POST, Crear nuevo carrito (va creando un cartId automatico, según el addCart)
router.post('/cart/', privateRoutes, createCartController);

// En la ruta GET, Lee todos los carritos guardados
router.get('/cart/', privateRoutes,  getCartsController);

// En la ruta GET, Listado de productos según carrito
router.get('/cart/:cid', privateRoutes,  getCartByIdController);

// En la ruta POST, Agregar pid a cart segun su cid
router.post('/cart/:cid/products/:pid', privateRoutes, addProductToCartController);

// En la ruta DELETE, Elimina pid a un cart segun su cid
router.delete('/cart/:cid/products/:pid', privateRoutes, deleteProductFromCartController);

// En la ruta DELETE, Eliminar todos los productos de un cart
router.delete('/cart/:cid', privateRoutes, deleteCartController);

// En la ruta PUT, debe actualizar el carrito
router.put('/cart/:cid', privateRoutes, updateAllCartController);

// En la ruta PUT, debe actualizar solo la cantidad de ejemplares del carrito
router.put('/cart/:cid/products/:pid', privateRoutes, updateController);

export default router;