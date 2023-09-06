const socketClient = io();
console.log(io);


const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();


    const inputTitle = document.getElementById('prod-title').value;
    const inputDescription = document.getElementById('prod-description').value;
    const inputPrice = parseFloat(document.getElementById('prod-price').value);
    const inputThumnail = document.getElementById('prod-thumbnail').value;
    const inputCode = parseInt(document.getElementById('prod-code').value, 10);
    const inputStock = parseInt(document.getElementById('prod-stock').value, 10);
    const inputStatus = document.getElementById('prod-status').value;
    const inputCategory = document.getElementById('prod-category').value;

    console.log("formulario enviado");

    console.log("Título:", inputTitle);
    console.log("Descripción:", inputDescription);
    console.log("Precio:", inputPrice);
    console.log("Thumbnail:", inputThumnail);
    console.log("Código:", inputCode);
    console.log("Stock:", inputStock);
    console.log("Status:", inputStatus);
    console.log("Categoría:", inputCategory);

    // Aquí, utiliza las variables en el objeto que enviarás al servidor
    socketClient.emit('newProduct', {

        title: inputTitle,
        description: inputDescription,
        price: inputPrice,
        thumbnail: inputThumnail,
        code: inputCode,
        stock: inputStock,
        status: inputStatus,
        category: inputCategory,
    });
});



