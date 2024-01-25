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





    // RESUMEN FINAL
    // PRECIO TOTAL PRODUCTOS CHECKOUT:
    let totalPrice = data.products.reduce((acumulador, producto) => {
      const price = parseInt(producto.product.price) || 0;
      const cantidad = parseInt(producto.quantity) || 0;
      return acumulador + (price * cantidad);
    }, 0);

const message = `Your payment of $${totalPrice.toFixed(2)} has been successful! \n \n Your order will arrive today. \n \n \n Thank you for choosing us always!`;
document.getElementById('total-amount').innerText = message;

    
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