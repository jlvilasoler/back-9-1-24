import { Router, application } from "express";
import { ProductManager } from "../src/dao/filesystem/productManager.js";
import { productModel } from "../src/dao/models/product.model.js";
import { cartModel } from "../src/dao/models/cart.model.js";
import CartManager from "../src/dao/database/cartManager.js";
import handlebars from "express-handlebars";
import publicRoutes from "../src/middlewares/publicRoutes.js";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import { getProdFilterPaginateController } from "../src/Controllers/ProductController.js";

const productManager = new ProductManager();

const cartManager = new CartManager();

const router = Router();



//router de Productos y paginación:
router.get("/products", privateRoutes, async (req, res, next) => {
    await getProdFilterPaginateController(req, res, next);
});

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('login', { products });
});

router.get('/realtimeproducts', privateRoutes,  async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {});
});

router.get('/messages', privateRoutes,  async (req, res) => res.render('chat',
    {}));

router.get('/verimg', privateRoutes,  async (req, res) => res.render('img',
    {}));



router.get('/carts/:cid', privateRoutes,  async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    res.render('cart', { cart })
});


router.get('/cookies', privateRoutes,  (req, res) => {
    res.render('cookies');
});


router.get('/getCookies', privateRoutes,  (req, res) => {
    res.send(req.cookies);
});


router.post('/setCookies', privateRoutes,  (req, res) => {
    const { nombre, valor } = req.body;
    res.cookie(nombre, valor, { maxAge: 1000 * 10 }).send('Cookie creada'); // con maxAge se borra la cookie , si no queremos que se borre hay que sacar maxAge
})






router.get('/login', publicRoutes, (req, res) => {
    if (req.session.isLogged) {
    res.redirect('/profile')
    }

    res.render('login')
})

router.get('/signup', publicRoutes, (req, res) => {
    if (req.session.isLogged) {
        return res.redirect('/profile')
    }
    res.render('signup')
})



// Bd de cantidad de visitas (acumulado), inicia con 0
const userVisitDB = {};

router.get('/profile' , (req, res) => {
    // Verifica si el usuario ya tiene un contador de visitas
    if (!userVisitDB[req.session.email]) {
        userVisitDB[req.session.email] = 1; // Inicializa el contador si es la primera visita
    } else {
        userVisitDB[req.session.email]++; // Incrementa el contador si no es la primera visita
    }
   // Obtiene la fecha de hoy en formato 'YYYY-MM-DD'
    const dateToday = new Date().toISOString().split('T')[0];
    const { first_name, last_name, email, age, role } = req.session.user;
    res.render('profile', { first_name, last_name, email, age, role, visitCount: userVisitDB[req.session.email], dateToday });
});


router.get('/recover', publicRoutes, (req, res) => {
    res.render('recover')
})


router.get('/logout', privateRoutes, (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


router.get('/failregister', (req, res) => {
    res.send("Register failure")
}) ;


router.get('/faillogin', (req, res) => {
    res.send("Login failure")
}) ;


export default router;



