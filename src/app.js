import { logger } from './utils/logger.js';
import { errors } from './middlewares/errors.js';
import ProductManager from './dao/filesystem/productManager.js';
import CartManager from './dao/filesystem/cartManager.js';
import handlebars from 'express-handlebars';
import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import viewsRouter from '../routes/viewsRouter.js';
import { Server } from 'socket.io';
//import { Socket } from 'socket.io';
import mongoose from 'mongoose';
import imgRouter from '../routes/imgRouter.js'
import session from "express-session";
import MongoStore from 'connect-mongo';
import userRouter from '../routes/userRouter.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import errorHandler from '../src/middlewares/errorHandler.js';
import { messageModel } from './dao/models/chat.model.js';
import productModel from './dao/models/product.model.js';
import cartModel from './dao/models/cart.model.js';
import ticketRouter from '../routes/ticketRouter.js';
import loggerRouter from '../routes/loggerRouter.js';
import userstatusRouter from '../routes/userstatusRouter.js';
import addproductRouter from '../routes/addproductsRouter.js';
//import mailRouter from '../routes/mail.router.js';
import settingsRouter from '../routes/settingsRouter.js';
import __dirname from './utils/index.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';






mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let response = await cartModel.find({}).explain("executionStats");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));


const productManager = new ProductManager();
const cartManager = new CartManager();

import express from "express";



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = app.listen(8080, () => {
    console.log("🚀 HTTP server running on port 8080");
});


const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'TIENDAONLINE.UY',
        description: 'Documentación',
      },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
  };
  
  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));


const mensajes = [];

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views'); // declaramos donde van a estar las vistas
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    req.context = { socketServer };
    next();
})

app.use(errorHandler);


initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use(errors);

app.use('/static', express.static('./src/public'));


app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', ticketRouter);

app.use(viewsRouter);

//app.use('/mail', mailRouter);
app.use('/settings', settingsRouter);
app.use('/img', imgRouter);
app.use('/cart', viewsRouter);
app.use('/cookies', viewsRouter);
app.use('/products', viewsRouter);
app.use('/loggertest', loggerRouter);
app.use('/users', userstatusRouter);
app.use('/addproducts', addproductRouter);
app.use('/', cartRouter);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));






socketServer.on('connection', async (socket) => {
    //console.log()'A user has connected:', socket.id);
    socket.emit("Socket-Products", await productManager.getProducts()); //le aviso al usuario que hay productos a visualizar

    const product = new ProductManager("/products.json")
    socket.on('newProduct', async (productPost) => { // me entero (como servidor) que un socket agrega un nuevo producto
        await product.addProduct(productPost.id, productPost.title, productPost.description, productPost.price, productPost.thumbnail, productPost.code, productPost.stock, productPost.status, productPost.category)
        socketServer.emit('Socket-Products', await product.getProducts()); //aviso a todos los sockets que hay nuevos productos
    })

    socket.on('deleteProduct', async (data) => {
        const idToDelete = parseInt(data.idDeleteFromSocketClient, 10);
        //console.log()`Solicitud de eliminación recibida del cliente:`, idToDelete);
        await product.deleteProduct(idToDelete);
        socketServer.emit('Socket-Products', await product.getProducts());
    });


    socket.on('mensaje', async (data) => {
        await messageModel.create(data);
        const mensajes = await messageModel.find().lean();
        //console.log()mensajes);
        socketServer.emit("nuevo-mensaje", mensajes)
    })

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado con ID: ${socket.id}`);
    });
});

