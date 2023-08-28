import { ProductManager } from "./productmanager.js"; 
import productRouter from "../routes/productRouter.js"
import express from "express";
const productManager = new ProductManager();





const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', productRouter)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
