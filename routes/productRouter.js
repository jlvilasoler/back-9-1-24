import { Router } from "express";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";

import { getProdFilterPaginateController, getByIdController, createController, updateController, deleteController } from "../src/Controllers/ProductController.js";

const router = Router();

// En la ruta GET, debe devolver los productos
router.get('/products/', privateRoutes, getProdFilterPaginateController);

// En la ruta GET, debe devolver un producto específico según el productId
router.get('/products/:pid', privateRoutes, getByIdController);

// En la ruta POST, debe agregar un nuevo producto
router.post('/products/', privateRoutes, createController);

// En la ruta PUT, debe actualizar el producto
router.put('/products/:pid', privateRoutes, updateController);

// En la ruta DELETE, debe borrar el producto especificado en la ruta
router.delete('/products/:pid', privateRoutes, deleteController);




export default router;
