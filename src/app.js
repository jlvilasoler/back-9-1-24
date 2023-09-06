import { ProductManager } from './productManager.js';
import CartManager from './cartmanager.js';
import handlebars from 'express-handlebars';
import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import viewsRouter from '../routes/viewsRouter.js';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';


const productManager = new ProductManager();
const cartManager = new CartManager();

import express from "express";

const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Servidor http en ejecución en el puerto 8080");
});

const socketServer = new Server(httpServer);


app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));

app.use((req, res, next) => {
    req.context = { socketServer };
    next();
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', viewsRouter);
app.use('/products', viewsRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);


socketServer.on('connection', (socket) => {
    console.log('Se conectó el usuario:', socket.id);
    socket.emit("productos", productManager.getProducts());
    const product = new ProductManager("/products.json")
    socket.on('newProduct', async(productPost)=>{
        await product.addProduct(productPost.id, productPost.title, productPost.description, productPost.price, productPost.thumbnail, productPost.code, productPost.stock, productPost.status, productPost.category)
        const newProdFromSocket = await product.getProducts();
        socketServer.emit('updateStateProduct', newProdFromSocket);
    })

    socket.on('deleteProduct', async (idDelete) => {
        const idToDelete = parseInt(idDelete, 10);
        console.log(`info recibida del socket cliente`, idToDelete);
        await product.deleteProduct(idToDelete);
    
        const newListFromSocket = await product.getProducts();
        socketServer.emit('updateStateProduct2', newListFromSocket);
    })


    });

