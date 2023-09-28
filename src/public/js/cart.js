import CartManager from "../../dao/database/cartManager";
import { cartModel } from "../../dao/models/cart.model";

const socket = io();
console.log(io);



const addToCartButton = document.getElementById("addToCart"); // Contenido campo escribir mensaje




getCookiesButton.addEventListener('click', (e) => {
    fetch('')
      .then((response) => response.json())
      .then((cookies) => console.log(cookies));
  });   