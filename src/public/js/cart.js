
// DELETE PRODUCT FROM CART
const deleteProductFromCart = async (cid, pid) => {
    console.log(cid, pid);
    const res = await fetch(`/api/cart/${cid}/products/${pid}`, {method: 'DELETE'});
    //console.log()res)
    const json = await res.json();
    //console.log()json);
    alert(`Product deleted from cart`);
}