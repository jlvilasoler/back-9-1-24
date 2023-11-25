import productModel from "../dao/models/product.model.js";
import { getAllCartsService, getCartByIdService, addCartService } from "../../src/Services/CartServices.js";
import { getAllProductsService, addProductService, deleteProductService, updateProductService, getProductByIdService } from "../Services/ProductServices.js";


// GET ALL _ funciona
export const getAllController = async (req, res, next) => {
    try {
        const products = await getAllProductsService();
        if (products) {
            res.send(products)
        } else {
            res.status(404).send();
        }
        } catch (error) {
            res.status(500).send("error getting products");
            next(error)
        }
    }

export const getProdFilterPaginateController = async (req, res, next) => {
    try {
        const pageId = parseInt(req.query.page) || 1; //con esto sabemos a la pagina que vamos a acceder, para hacer la numeracion de cada pagina /1, /2 ,/3...
        const limit = parseInt(req.query.limit) || 10; //Por defecto es limite 10 por pagina , pero se le puede poner un lmite n
        const sort = req.query.sort || 'asc';
        const query = req.query.query || '';
        const stockQuery = req.query.status || '';

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
        if (stockQuery === 'true' || stockQuery === 'false') { filter.status = stockQuery === 'true'; }

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
            status: "success",
            payload: result.docs,
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

        // RESUMEN RENDERIZADO:
        const responseObject = {
            status: "success",
            payload: result.docs,
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            page: result.page,
            pagingCounter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        };
    } catch (error) {
        next(error)
    }
}

//FILTER BY ID _ funciona
export const getProductByIdController = async (req, res, next) => {
    try {
        const { pid } = req.params;
       const product = await getProductByIdService(pid);
       if (product) {
        res.send(product)
    } else {
        res.status(404).send();
    }
    } catch (error) {
        res.status(500).send("error filtering product");
        next(error)
    }
}

//DELETE PRODUCT BY ID _ funciona
export const deleteController = async (req, res, next) => {
    try {
        const { pid } = req.params;
       const product =  await deleteProductService(pid);
        if (product) {
            res.send(product)
        } else {
            res.status(404).send();
        }
        } catch (error) {
            res.status(500).send("error deleting product");
            next(error)
        }
    }



    
    export const createController = async (req, res, next) => {
        const { title, description, price, thumbnail, code, stock, category } = req.body;
      
        try {
          const newProduct = new productModel({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
          });
      
          await newProduct.save();
      
          res.send(newProduct);
          console.log(newProduct);
        } catch (error) {
          console.error("Error adding product:", error);
          res.status(500).send(`Error adding product: ${error.message}`);
          next(error);
        }
      };
      






export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, price, thumbnail, code, stock, status } = req.body
        await getProductByIdService(id);
        const docUpd = await updateProductService(id, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status
        })
        res.json(docUpd);
    } catch (error) {
        next(error)
    }
}


