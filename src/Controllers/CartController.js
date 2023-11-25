import {
    getAllCartsService,
    addCartService,
    getCartByIdService,
    getProductsInCartService,
    updateProductQuantityService,
    deleteCartService,
    getCartByIdServ,
    emptyCartService,
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
//DELETE CART
export const deleteCartController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const productsDeleted = await deleteCartService(cid);
        if (productsDeleted !== null) {
            res.status(201).send({ status: "success", mensaje: "Cart deleted successfully!", payload: productsDeleted });
        } else {
            res.status(404).send({ status: "error", mensaje: "Cart not found" });
        }
    } catch (error) {
        next(error);
    }
};
//ELIMINA PRODUCTO AL CARRITO
export const deleteProductFromCartController = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
    
        await deleteCartService(cid, pid);
        res.json({ message: 'Product removed from the cart' });
    } catch (error) {
        console.error('Error deleting product from the cart:', error);
        res.status(500).json({ error: 'Internal server error' });
        next(error)
    }
}

//VACIAR CARRITO
export const emptyCartController = async (req, res, next) => {
    try{
        const cid = req.params.cid;
    
        await emptyCartService(cid); 
        res.send('Updated successfully');
        
        }catch(error){
            console.error('Error when deleting cart', error);
            res.status(500).json({ error: 'Internal server error' });
            next(error)
        }
}
