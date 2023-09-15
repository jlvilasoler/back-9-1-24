const socket = io();
console.log(io);

let usuario = '';

const caja = document.getElementById("caja");
const contenido = document.getElementById("contenido");



    caja.addEventListener("change", (e) => {
        socket.emit("mensaje", {
            user: usuario,
            mensaje: e.target.value,
        });
        console.log("mensaje enviado")
    });



Swal.fire({
    title: 'Insert your email:',
    input: 'text',
    inputAttributes: {
        autocapitalize: 'off'
    },
    confirmButtonText: 'ingresar',
    showLoaderOnConfirm: true,
}).then((result) => {usuario = result.value;
});



socket.on("nuevo-mensaje", (data) => {
    const mensajes = data.map(({user, mensaje}) => {
        return `<p>${user} dijo: ${mensaje}</p>`;
    });
    contenido.innerHTML = mensajes.join('');
});