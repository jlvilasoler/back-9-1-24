const socketServices = (socketServer, productManager, messageModel) => {
    socketServer.on('connection', async (socket) => {

        socket.emit('Socket-Products', await productManager.getProducts());

        const product = new ProductManager('/products.json');
        socket.on('newProduct', async (productPost) => {
            await product.addProduct(
                productPost.id,
                productPost.title,
                productPost.description,
                productPost.price,
                productPost.thumbnail,
                productPost.code,
                productPost.stock,
                productPost.status,
                productPost.category
            );
            socketServer.emit('Socket-Products', await product.getProducts());
        });

        socket.on('deleteProduct', async (data) => {
            const idToDelete = parseInt(data.idDeleteFromSocketClient, 10);
            // console.log(`Solicitud de eliminación recibida del cliente:`, idToDelete);
            await product.deleteProduct(idToDelete);
            socketServer.emit('Socket-Products', await product.getProducts());
        });

        socket.on('mensaje', async (data) => {
            await messageModel.create(data);
            const mensajes = await messageModel.find().lean();
            // console.log(mensajes);
            socketServer.emit('nuevo-mensaje', mensajes);
        });

        socket.on('disconnect', () => {
            console.log(`Usuario desconectado con ID: ${socket.id}`);
        });
    });
};

export default socketServices;