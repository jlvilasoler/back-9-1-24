const socketClient = io();
console.log(io)



const form = document.getElementById('form');
const inputCategory = document.getElementById('prod-category');
const inputTitle = document.getElementById('prod-title');
const inputDescription = document.getElementById('prod-description');
const inputPrice = document.getElementById('prod-price');
const inputThumnail = document.getElementById('prod-thumbnail');
const inputCode = document.getElementById('prod-code');
const inputStock = document.getElementById('prod-stock');
const divVacio = document.getElementById('divVacio');

const deleteProduct = document.getElementById('post-delete');
const inputDelete = document.getElementById('prod-delete');







form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const category = inputCategory.value
    const title = inputTitle.value
    const description = inputDescription.value
    const price = inputPrice.value
    const thumbnail = inputThumnail.value
    const code = inputCode.value
    const stock = inputStock.value
    socketClient.emit('newProduct', {category, title, description, price, thumbnail, code, stock})
})