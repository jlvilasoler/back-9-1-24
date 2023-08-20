const fs = require("fs");

class ProductManager {
    static id = 0;
    constructor() {
        this.products = [];
        this.path = "./Products.json";
        this.idCounter = 1;
    }

    async addProduct(title, description, price, thumbnail, code, stock, id) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Operación inválida, debe llenar todos los campos");
            return;
        }

        try {
            const contentObj = await this.getProducts();
            if (contentObj.some((product) => product.code === code)) {
                console.log(`Atención: no se puede agregar un nuevo código ${code} , debido a que ya existe otro código con el mismo número`);
                return;
            }

            const product = {
                id: ProductManager.id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            contentObj.push(product);
            product.id = this.idCounter++;
            this.products.push(product);

            await fs.promises.writeFile("./Products.json", JSON.stringify(contentObj, null, "\t"));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productsNotId = products.filter((product) => product.id != id);
        await fs.promises.writeFile("./Products.json", JSON.stringify(productsNotId, null, "\t"));
    }


    async getProducts() {
        try {
            const content = await fs.promises.readFile("./src/Products.json", "utf-8");
            const contentObj = JSON.parse(content);
            return contentObj;
        } catch (error) {
            console.log("No se pudo leer el archivo Products.json. Se creará uno nuevo.", error);
            return [];
        }
    }

    async getProductById(id) {
        let data = await this.getProducts()
        let productFind = data.find(product => product.id == id)
        return productFind === undefined ? console.log(`No se encontró el ID:${id} que desea buscar`) : productFind
    }


    //Actualiza los datos del objeto determinado, si hay modificaciones
    /*async updateProduct(id, updatedProduct) {
        try {
            let contentObj = await this.getProducts();
            const index = contentObj.findIndex((product) => product.id === id);
            if (index >= 0) {
                contentObj[index] = { ...contentObj[index], ...updatedProduct };
                await fs.promises.writeFile("./Products.json", JSON.stringify(contentObj, null, "\t"));
            } else {
                console.log(`No se encontró el producto con el id ${id}`);
            }
        } catch (error) {
            console.log(error);*/

async updateProduct(productId) {
    const data = await fs.promises.readfile("products.json", "utf-8");
    const products = JSON.parse(data);
    const product = products.find(({ id }) => id === productId)

    product.atribute = newValue;

    await fs.promises.writeFile("products.json", JSON.stringify(products));
}
}

module.exports = ProductManager;