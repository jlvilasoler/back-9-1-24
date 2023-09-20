import { Router } from "express";
import { ProductManager } from "../src/dao/filesystem/productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {});
});

router.get('/messages', async (req, res) => res.render('chat',
{}));

router.get('/verimg', (req, res) => res.render('img',
{}));


export default router;