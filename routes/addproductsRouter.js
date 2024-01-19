import { Router } from "express";
import { createController } from "../src/Controllers/ProductController.js";

const router = Router();


router.get('/', async (req, res) => res.render('addproducts',
    {}));

router.post('/', async (req, res) => res.render('create',
    {createController}));



export default router;