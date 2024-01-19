const socket = io();
console.log("ok");

///NO TERMINADO
// DELETE USER FROM SYSTEM
const deleteUser = async (uid) => {
    console.log(uid);
    const res = await fetch(`/api/users/${uid}`, {method: 'DELETE'});
    const json = await res.json();
    alert(`User deleted from system`);

        // Recarga la página después de eliminar el producto
        window.location.reload();
}