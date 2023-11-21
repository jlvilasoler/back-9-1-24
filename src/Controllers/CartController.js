import { cartModel } from "../dao/models/cart.model.js";

import { getAllCartsService, addCartService, getCartByIdService, getProductsInCartService, updateProductQuantityService, getCartByIdServ, deleteProductFromCartService, deleteCartService } from "../Services/CartServices.js";
import { addProductService } from "../Services/ProductServices.js";



// MUESTRA TODOS LOS CARRITOS
export const getCartsController = async (req, res, next) => {
    try {
        const docs = await getAllCartsService();
        if (docs.length === 0) {
            res.status(400).send({status: "error", message: "We couldn't find any cart", payload: docs})
        } else {
            res.status(200).send({status: "success", message:"Cart was found", payload: docs})
        }
    } catch (error) {
        next(error);
    }
}

// MUESTRA CARRITO POR ID
export const getCartByIdController = async (req, res, next) => {
    try {
        const { cid } = req.params;
       //const docs = await getCartByIdService(Number(cid));
        const docs = await getCartByIdService(cid);
        res.status(200).json(docs);
    } catch (error) {
    next(error);
    }
};

// CREA CARRITO
export const createCartController = async (req, res, next) => {
    try {
        const docs = await addCartService();
        res.status(201).send(docs)
    } catch (error) {
        next(error);
    }
};

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
};

//ACTUALIZA CANTIDAD PROD AL CARRITO
export const updateProductQuantityController = async (req,res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const updatedCart = await updateProductQuantityService(cid, pid, quantity);
        if (!updatedCart) {
        return res.status(404).json({ message: "Cart or product not found" });
        }
        return res.status(200).json({
            message: "Product quantity updated successfully",
            payload: updatedCart,
        });
    } catch (error) {
        next(error);
    }
}
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
//ELIMINA CARRITO
export const deleteCartController = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const productsDeleted = await deleteCartService(cid); 
        if (productsDeleted ) {
            res.status(201).send({status: "success",mensaje: "Cart deleted successfully!",payload: productsDeleted });
        } else {
        res.status(404).send({status: "error",mensaje:"Cart not found"});
        } 
    } catch (error) {
        next(error);
    }
}
//ELIMINA PRODUCTO AL CARRITO
export const deleteProductFromCartController = async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const productDeleted = await deleteProductFromCartService(cid,pid); 
        if (productDeleted ) {
        res.status(201).send({status: "success",mensaje: "The product you have selected has been successfully deleted from cart!"});
        } else {
        res.status(404).send({status: "error",mensaje:"The product or cart you are searching for could not be found!"});
        } 
    } catch (error) {
        next(error);
    }
}
