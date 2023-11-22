import ProductManager from "../dao/database/productManager.js";
const PM = new ProductManager();

export const addProductService = async (id, obj) => {
    try {
        const newProd = await PM.updateProduct(id, obj)
        console.log(newProd)
        if(!newProd){
            throw new Error('Validation error')
        } else return newProd;
    } catch (error) {
        console.log(error);
    }
};


export const getProductsService = async () => {
    try {
        const docs = await PM.getProducts();
        return docs;
    } catch (error) {
        //console.log()error);
    }
};

export const getProductByIdService = async (id) => {
    try {
        const docs = await PM.getProductById(id);
        return docs;
    } catch (error) {
        //console.log()error);
    }
};



export const deleteProductService  = async (pid) => {
    try {
        const data = await productRepository.deleteRepository({ _id: pid });
        return data;
    } catch (error) {
        console.log("Error when deleting product", error)
    }
}

export const updateProductService = async (id, obj) => {
    try {
        const docs = await PM.updateProduct(id, obj);
        return docs;
    } catch (error) {
        //console.log()error);
    }
}

export const pageProductsService = async (modelQuery, modelLimit, modelPage, modelSort) => {
    try {
        const page = await productRepository.pageRepository(modelQuery, modelLimit, modelPage, modelSort);
        return page;

    } catch (error) {
        console.error("error in pageProducts function:", error);
        throw error;
    }
};
