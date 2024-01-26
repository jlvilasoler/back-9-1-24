import sendMailCheckout from "../../Services/Checkoutmail.service.js";


document.getElementById('payButton').addEventListener('click', async function() {
  console.log("payButton")
    try {
      // Call the sendMail function when the button is clicked
      await sendMailCheckout();
      // Redirect to the checkout/finish page after sending the email
      window.location.href = `'/carts/checkout/finish'`;
    } catch (error) {
      // Handle any errors that may occur during email sending
      console.error("Error handling PAY button click:", error);
      // You may want to show an error message to the user if needed
      alert("Error processing payment. Please try again.");
    }
  });