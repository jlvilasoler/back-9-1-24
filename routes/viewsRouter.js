import { Router } from "express";
import { ProductManager } from "../src/productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
});

router.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('index', {products});
});


export default router;