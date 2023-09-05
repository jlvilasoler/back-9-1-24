import { ProductManager } from './productManager.js'; 
import  CartManager  from './cartmanager.js';
import handlebars from 'express-handlebars';
import cartRouter from '../routes/cartRouter.js';
import { Server, Socket } from 'socket.io';
import productRouter from '../routes/productRouter.js';
import viewsRouter from '../routes/viewsRouter.js';


const productManager = new ProductManager();
const cartManager = new CartManager();

import express from "express";

const app = express();

const httpServer = app.listen(8080, () => {
    console.log(`Servidor en ejecución en el puerto 8080`);
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
app.use('/realtimeproducts', viewsRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);