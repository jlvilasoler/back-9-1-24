import sendMailinfo from "../../Services/Checkoutmail.service.js";

document.getElementById('payButton').addEventListener('click', async function() {
  console.log("payButton");
  try {
    await sendMailinfo();
    window.location.href = '/carts/checkout/finish';
  } catch (error) {
    console.error("Error al manejar clic en el botón de pago:", error);
    alert("Error procesando el pago. Por favor, inténtalo de nuevo.");
  }
});