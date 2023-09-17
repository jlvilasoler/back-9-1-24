import { Router } from "express";
import ProductManager from "../src/productManager.js";
import productManager from "../src/dao/models/db/productmanager.js";

const productManager = new ProductManager();
const ProdManager = new productManager(); // se agrega para el mongoo

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
        const pid = parseInt(req.params.pid, 10);
        const product = await productManager.getProducts();
        const busquedaId = product.find((prod) => prod.id === pid)

        if (busquedaId) {
            res.send(busquedaId);
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
        const prod = req.body
        const { pid } = req.params
        const prodFind = await productManager.getProductById(parseInt(pid))
        if (prodFind) {
            await productManager.updateProduct(parseInt(pid), prod)
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