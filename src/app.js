import ProductManager from './dao/filesystem/productManager.js';
import CartManager from './dao/filesystem/cartManager.js';
import handlebars from 'express-handlebars';
import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import viewsRouter from '../routes/viewsRouter.js';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import mongoose from 'mongoose';
import imgRouter from '../routes/imgRouter.js'


import { messageModel } from './dao/models/chat.model.js';
import { productModel } from './dao/models/product.model.js';
import { cartModel } from './dao/models/cart.model.js';

mongoose.connect(
'mongodb+srv://jlvila:jj123456@jlvila.w8q6kim.mongodb.net/ecommerce?retryWrites=true&w=majority', {
useNewUrlParser: true,
useUnifiedTopology: true
});


let response = await cartModel.find({}).explain("executionStats");
console.log(response);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
console.log('Connection to MongoDB established successfully');
});



const productManager = new ProductManager();
const cartManager = new CartManager();

import express from "express";

const app = express();
const httpServer = app.listen(8080, () => {
    console.log("HTTP server running on port 8080");
});

const mensajes = [];

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

app.use('/static', express.static('./src/public'));



app.use('/', viewsRouter);
app.use('/products', viewsRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use(viewsRouter);

app.use('/img', imgRouter);




socketServer.on('connection', async (socket) => {
    console.log('A user has connected:', socket.id);

    socket.emit("Socket-Products", await productManager.getProducts()); //le aviso al usuario que hay productos a visualizar

    const product = new ProductManager("/products.json")
    socket.on('newProduct', async (productPost)=>{ // me entero (como servidor) que un socket agrega un nuevo producto
        await product.addProduct(productPost.id, productPost.title, productPost.description, productPost.price, productPost.thumbnail, productPost.code, productPost.stock, productPost.status, productPost.category)
        socketServer.emit('Socket-Products', await product.getProducts()); //aviso a todos los sockets que hay nuevos productos
    })

    socket.on('deleteProduct', async (data) => {
        const idToDelete = parseInt(data.idDeleteFromSocketClient, 10);
        console.log(`Solicitud de eliminación recibida del cliente:`, idToDelete);
        await product.deleteProduct(idToDelete);
        socketServer.emit('Socket-Products', await product.getProducts());
    });


    socket.on('mensaje', async (data) => {
        await messageModel.create(data);
        const mensajes = await messageModel.find().lean();
        console.log(mensajes);
        socketServer.emit("nuevo-mensaje", mensajes)
    })
    


    socket.on('disconnect', () => {
        console.log(`Usuario desconectado con ID: ${socket.id}`);

    });
});
