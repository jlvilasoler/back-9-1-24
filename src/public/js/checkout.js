console.log("OK")

async function updateCheckout() {
  const cartId = '65161cf7b4f0ae3a37ba7332';
  console.log(cartId);
  try {
    const response = await fetch(`/api/carts/${cartId}/checkout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();



    // Actualiza el contenido de la página con los resultados obtenidos
    document.getElementById('user-number').innerText = `Cart ID:  ${data._id}`;
    document.getElementById('ticket-number').innerText = `Ticket Number: ${data._id}`;




    // DETALLE INFORMACION ARTICULO:
    // Cant. por producto
    let prodQuantity = data.products.reduce((acumulador, producto) => {
      const quant = parseInt(producto.quantity) || '';
      return `${acumulador}${quant}<br>`;
    }, '');
    document.getElementById('products-quant').innerHTML = `<br>${prodQuantity}`;

    // Nombre por producto
    let prodTitle = data.products.reduce((acumulador, producto) => {
      const title = producto.product.title || '';
      return `${acumulador}${title}<br>`;
    }, '');
    document.getElementById('products-title').innerHTML = `<br>${prodTitle}`;

    // Descripcion por producto
    let prodDescription = data.products.reduce((acumulador, producto) => {
      const description = producto.product.description || '';
      return `${acumulador}${description}<br>`;
    }, '');
    document.getElementById('products-description').innerHTML = `<br>${prodDescription}`;

    // Precio por producto
    let prodPrice = data.products.reduce((acumulador, producto) => {
      const price = parseInt(producto.product.price) || '';
      return `${acumulador}$ ${price.toFixed(2)}<br>`;
    }, '');
    document.getElementById('products-price').innerHTML = `<br>${prodPrice}`;




    // RESUMEN FINAL
    // CANTIDAD PRODUCTOS CHECKOUT:
    let cant = data.products.reduce((acumulador, producto) => {
      const cantidad = parseInt(producto.quantity) || 0;
      return acumulador + cantidad;
    }, 0);
    document.getElementById('products-quantity').innerText = `Quantity: ${cant}`;

    // PRECIO TOTAL PRODUCTOS CHECKOUT:
    let totalPrice = data.products.reduce((acumulador, producto) => {
      const price = parseInt(producto.product.price) || 0;
      const cantidad = parseInt(producto.quantity) || 0;
      return acumulador + (price * cantidad);
    }, 0);
    document.getElementById('total-amount').innerText = `Total $: ${totalPrice.toFixed(2)}`;



    
    // FECHA Y HORA DEL MOMENTO DEL HACER EL CHECKOUT
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    document.getElementById('current-date').innerText = `Date: ${formattedDate}`;
    document.getElementById('current-time').innerText = `Time: ${formattedTime}`;
  } catch (error) {
    console.error('Error updating checkout:', error);
  }
}

window.onload = updateCheckout;