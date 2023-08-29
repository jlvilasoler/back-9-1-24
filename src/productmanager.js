import fs from "fs"

export class ProductManager {


    constructor() {
        this.products = [];
        this.path = "./src/products.json";

    }

    async getId() {
        let data = await this.getProducts();
        return data.length + 1;
    }


    async addProduct(title, description, category, price, thumbnail, code, stock, status) {
        const newProduct = {
            title,
            description,
            category,
            price,
            thumbnail,
            code,
            stock,
            status,
        };

        try {
            if (!fs.existsSync(this.path)) {
                const newList = [];
                newList.push({ ...newProduct, id: await this.getId() });

                await fs.promises.writeFile(this.path, JSON.stringify(newList, null, '\t'))

            } else {
                const data = await this.getProducts();
                const repeatCode = this.products.some(e => e.code == newProduct.code)
                repeatCode == true ? console.log("El codigo esta repetido") : data.push({ ...newProduct, id: await this.getId()});
                await fs.promises.writeFile(
                this.path, 
                JSON.stringify(data, null, '\t'));

            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productsNotId = products.filter((product) => product.id != id);
        await fs.promises.writeFile("./src/Products.json", JSON.stringify(productsNotId, null, "\t"));
    }


    async getProducts() {
        try {
            const content = await fs.promises.readFile("./src/Products.json", "utf-8");
            const contentObj = JSON.parse(content);
            return contentObj;
        } catch (error) {
            console.log("No se pudo leer el archivo products.json. Se creará uno nuevo.", error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            let data = await this.getProducts()
            let productFind = data.find(product => product.id == id)
            return productFind === undefined ? console.log(`No se encontró el ID:${id} que desea buscar`) : productFind
        } catch (error) {
            console.log("No se pudo leer el archivo products.json. Se creará uno nuevo.", error);
            return [];
        }
    }

    async updateProduct(id, product) {
        let data = await this.getProducts();
        let i = data.findIndex((e) => e.id === id);
        data.splice(i, 1, product);
        await fs.promises.writeFile("./src/Products.json", JSON.stringify(data, null, 2));
    }
    }


    export default ProductManager;