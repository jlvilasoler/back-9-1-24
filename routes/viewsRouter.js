import { Router } from "express";
import { ProductManager } from "../src/dao/filesystem/productManager.js";
import { productModel } from "../src/dao/models/product.model.js";

const productManager = new ProductManager();

const router = Router();




//router de Productos y paginación:
router.get("/products", async (req, res) => {
    const pageId = parseInt(req.query.page) || 1; //con esto sabemos a la pagina que vamos a acceder, para hacer la numeracion de cada pagina /1, /2 ,/3...
    const limit = parseInt(req.query.limit) || 10; //Por defecto es limite 10 por pagina , pero se le puede poner un lmite n
    const sort = req.query.sort || 'asc';
    const query = req.query.query || '';
    const stockQuery = req.query.stock || '';

    //Sort
    const sortOptions = {};
    if (sort === "asc") {
        sortOptions.price = 1;
    } else if (sort === "desc") {
        sortOptions.price = -1;
    }

    // filtro por category, description y title
    const filter = {};
    if (query) {
        filter.$or = [
            { category: { $regex: new RegExp(query, 'i') } },
            { title: { $regex: new RegExp(query, 'i') } },
            { description: { $regex: new RegExp(query, 'i') } }
        ];
    }

    if (stockQuery) {
        filter.stock = stockQuery;
    }




    //Paginate:
    const result = await productModel.paginate(
        filter,
        {
            page: pageId, //queremos ir a la pagina x
            limit, // con limite de tantos productos
            sort: sortOptions, // sort con Opciones: asc y desc
            lean: true,
    }
    );



    
    const prevPage = pageId > 1 ? pageId - 1 : null; // Página previa o null si no hay
    const nextPage = result.hasNextPage ? pageId + 1 : null; // Página siguiente o null si no hay

    const prevLink = prevPage ? `/products?page=${prevPage}` : null;
    const nextLink = nextPage ? `/products?page=${nextPage}` : null;


    const pageNumbers = [];
    if (prevPage) {
        pageNumbers.push({
            number: prevPage,
            link: prevLink,
            isPrevious: true
        });
    }
    pageNumbers.push({
        number: pageId,
        link: `/products/${pageId}/${limit}/${sort}/${query}`,
        isCurrent: true
    });
    if (nextPage) {
        pageNumbers.push({
            number: nextPage,
            link: nextLink,
            isNext: true
        });
    }
    res.render('products', {
        products: result.docs,
        prevLink,
        nextLink,
        pageNumbers,
        currentPage: pageId,
        currentLimit: limit,
        currentSort: sort,
        currentQuery: query,
        currentStock: stockQuery,
    });
    console.log(result);
});


router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
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