import fs from "fs"

export class ProductManager {
    static id = 0;
    constructor() {
        this.products = [];
        this.path = "./Products.json";
        this.idCounter = 1;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
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

            await fs.promises.writeFile("./src/products.json", JSON.stringify(contentObj, null, "\t"));
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


