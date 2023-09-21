import { Router } from "express";
import ProductManager from "../src/dao/database/productManager.js";


const productManager = new ProductManager();


const router = Router();

// En la ruta GET, debe devolver los productos
router.get('/products/', async (req, res) => {
    const { limit } = req.query
    const readproduct = await productManager.getProducts();
    if (limit) {
        const limitProduct = await readproduct.splice(0, parseInt(limit))
        res.send(limitProduct)
    } else {
        res.send(readproduct)
    }
});

// En la ruta GET, debe devolver un producto específico según el productId
router.get('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProducts();

        if (product) {
            res.send(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// En la ruta POST, debe agregar un nuevo producto
router.post('/products/', async (req, res) => {
    try {
        const {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        } = req.body;
        const newProd = await productManager.addProduct(id, title, description, price, thumbnail, code, stock, status, category);
        
        req.context.socketServer.emit()
        
        res.json(newProd);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// En la ruta PUT, debe actualizar el producto
router.put('/products/:pid', async (req, res) => {
    try {

        const { pid } = req.params
        const prodFind = await productManager.getProductById(pid)
        if (prodFind) {
            await productManager.updateProduct(pid);
            res.send("Product updated successfully")
        } else {
            res.status(404).send('product not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// En la ruta DELETE, debe borrar el producto especificado en la ruta
router.delete('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const eliminar = await productManager.deleteProduct(productId);
        res.json(eliminar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




export default router;