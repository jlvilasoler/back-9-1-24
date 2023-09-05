import { Router } from "express";
import { ProductManager } from "../src/productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
});

router.get('/realtime', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realtime', {products});
});


export default router;