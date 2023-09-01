import { ProductManager } from "./productManager.js"; 
import  CartManager  from "./cartmanager.js";

import cartRouter from "../routes/cartRouter.js"
import productRouter from "../routes/productRouter.js";



const productManager = new ProductManager();
const cartManager = new CartManager();

import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', productRouter);
app.use('/api', cartRouter);

app.listen(8080, () => {
    console.log(`Servidor en ejecución en el puerto 8080`);
});