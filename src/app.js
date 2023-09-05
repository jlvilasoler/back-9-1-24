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
app.use(express.static('/public/js'));

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
});