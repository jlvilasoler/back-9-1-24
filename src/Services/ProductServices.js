import ProductManager from "../dao/database/productManager.js";
const PM = new ProductManager();


export const getProductsService = async () => {
    try {
        const docs = await PM.getProducts();
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const getProductByIdService = async (id) => {
    try {
        const docs = await PM.getProductById(id);
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const addProductService = async (id) => {
    try {
        const newProd = await PM.addProduct(id)
        console.log("prod agregado")
        if(!newProd){
            throw new Error('Validation error')
        } else return newProd;
    } catch (error) {
        console.log(error);
    }
};

export const updateProductService = async (id, obj) => {
    try {
        const docs = await PM.updateProduct(id, obj);
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductService = async (id) => {
    try {
        const docs = await PM.deleteProduct(id);
        return docs;
    } catch (error) {
        console.log(error);
    }
};
