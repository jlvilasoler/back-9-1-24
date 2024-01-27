import { Router } from "express";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";
import { getAllController, /*getProdFilterPaginateController*/createController, updateController, deleteController, getProductByIdController } from "../src/Controllers/ProductController.js";
import { addProductToCartController } from "../src/Controllers/CartController.js";

const router = Router();

// En la ruta GET, debe devolver los productos
router.get('/products/', privateRoutes, /*getProdFilterPaginateController)*/ getAllController);

// En la ruta GET, debe devolver un producto específico según el productId
router.get('/products/:pid', privateRoutes, getProductByIdController);

// En la ruta POST, debe agregar un nuevo producto
router.post('/products/', privateRoutes, createController);

// En la ruta PUT, debe actualizar el producto
router.put('/products/:pid', privateRoutes, updateController);

// En la ruta DELETE, debe borrar el producto especificado en la ruta
router.delete('/products/:pid', privateRoutes, deleteController);

// Agregar producto a carrito:
router.post('/cart/:cid/products/:pid', privateRoutes, addProductToCartController);


export default router;
