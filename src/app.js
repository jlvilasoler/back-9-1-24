const express = require("express");
const ProductManager = require('./productmanager.js'); // Importa la clase desde el archivo
const productManager = new ProductManager();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
    const limit = req.query.limit;

    const products = await productManager.getProducts();

    if (limit) {
        return res.send(products.slice(0, limit));
    }
    res.send(products);
});

app.get("/products/:productId", async (req, res) => {
    const productId = parseInt(req.params.productId, 10); // Cambiado de params.productId a params.id
    const products = await productManager.getProducts();

    const product = products.find(( { id }) => id === productId);
    if(product === undefined) {
        return res.status(404).send();
    }
    
    res.send(product);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});