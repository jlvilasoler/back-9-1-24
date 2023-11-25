import ProductManager from "../dao/database/productManager.js";
import ProductRepository from "../repository/ProductRepository.js";

const productRepository = new ProductRepository();
const PM = new ProductManager();


// GET ALL _ funciona
export const getAllProductsService = async () => {
    try {
        const products = await productRepository.getProductRepository();
        return products;
    } catch (error) {
        console.log(error);
    }
};

//FILTER BY ID _ funciona
export const getProductByIdService = async (pid) => {
    try {
        const product = await productRepository.getProductIdRepository({ _id: pid });
        return product;
    } catch (error) {
        console.log(error);
    }
};

//DELETE PROD BY ID _ funciona
export const deleteProductService = async (pid) => {
    try {
        const product = await productRepository.deleteRepository({ _id: pid });
        return product;
    } catch (error) {
        console.log(error);
    }
};

//ADD PRODUCT _ 
export const addProductService = async (title, description, price, thumbnail, code, stock, status, category) => {
    const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    };

    
    try {
        const productCreate = await productRepository.postProductRepository(newProduct);
        console.log(productCreate," producto creado")
        return productCreate;
    } catch (error) {
        console.log("Error when adding product", error);
    }
};













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
