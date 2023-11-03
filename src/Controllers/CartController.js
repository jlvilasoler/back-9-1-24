import { cartModel } from "../dao/models/cart.model.js";

import { getAllCartsService, addCartService, getCartByIdService, getProductsInCartService, updateProductQuantityService, getCartByIdServ } from "../Services/CartServices.js";
import { addProductService } from "../Services/ProductServices.js";


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


export const createCartController = async (req, res, next) => {
    try {
        const docs = await addCartService();
        res.status(201).send(docs)
    } catch (error) {
        next(error);
    }
};

//...
export const addProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await addProductService(cid,pid);
        if (product) {
            res.status(201).send({status: "success",mensaje: "Product successfully added to cart!",payload: product});
        } else {
            res.status(404).send({status: "error",mensaje:"The product or cart you are searching for could not be found!"});
        }
    } catch (error) {
        next(error);
    }
};

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

export const deleteProductToCartController = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const productsDeleted = await deleteProductToCartController(cid); 
        if (productsDeleted ) {
            res.status(201).send({status: "success",mensaje: "Product/s successfully deleted from cart!",payload: productsDeleted });
        } else {
        res.status(404).send({status: "error",mensaje:"The product or cart you are searching for could not be found!"});
        } 
    } catch (error) {
        next(error);
    }
}

export const deleteProductFromCartController = async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const productDeleted = await deleteProductFromCartController(cid,pid); 
        if (productDeleted ) {
        res.status(201).send({status: "success",mensaje: "The product/s you have selected has/have been successfully deleted from cart!"});
        } else {
        res.status(404).send({status: "error",mensaje:"The product or cart you are searching for could not be found!"});
        } 
    } catch (error) {
        next(error);
    }
}
