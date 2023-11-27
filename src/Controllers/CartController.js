import {
    getAllCartsService,
    addCartService,
    getCartByIdService,
    getProductsInCartService,
    updateProductQuantityService,
    deleteCartService,
    getCartByIdServ
  } from "../../src/Services/CartServices.js";
import { addProductService } from "../Services/ProductServices.js";
import errorHandler from "../middlewares/errorHandler.js";


// MUESTRA TODOS LOS CARRITOS - Okok
export const getCartsController = async (req, res, next) => {
    try {
        const allCarts = await getAllCartsService();
        res.json(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}

// MUESTRA CARRITO POR ID - Okok
export const getCartByIdController = async (req, res, next) => {
    try {
        const { cid } = req.params;
       //const docs = await getCartByIdService(Number(cid));
       const docs = await getCartByIdServ(cid);
        res.status(200).json(docs);
    } catch (error) {
    next(error);
    }
};

// CREA CARRITO - Okok
export const createCartController = async (req, res, next) => {
    try {
        const docs = await addCartService();
        res.status(201).send(docs)
    } catch (error) {
        next(error);
    }
};

//DELETE PRODUCT BY ID
export const deleteCartController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await deleteCartService(cid);
        if (cart) {
            res.send(cart)
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send("error deleting cart");
        next(error)
    }
}
















//AGREGA UN PRODUCTO AL CARRITO
export const addProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await addProductService(cid,pid);
        //console.log(product)
        if (product) {
            res.status(201).send({status: "success",mensaje: "Product successfully added to cart!",payload: product});
        } else {
            res.status(404).send({status: "error",mensaje:"The product or cart you are searching for could not be found!"});
        }
    } catch (error) {
        next(error);
    }
}

//ACTUALIZA CANTIDAD PROD AL CARRITO
export const updateProductQuantityController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await updateProductQuantityService(cid, pid, quantity);
        if (!updatedCart) {
            return res.status(404).json({ status: "error", message: "Cart or product not found" });
        }
        return res.status(200).json({
            status: "success",
            message: "Product quantity updated successfully",
            payload: updatedCart,
        });
    } catch (error) {
        next(error);
    }
};
//ACTUALIZA TODO EL CARRITO
export const updateAllCartController = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const { quantity, productId } = req.body;
        const cartUpd = await getCartByIdServ(cid, {products : [{
            quantity,
            productId
        }]
        })
        return res.status(200).json({
            message: "Cart updated successfully",
            payload: cartUpd,
        });
    } catch (error) {
        next(error);
    }
}





