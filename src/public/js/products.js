console.log("OK")


// ADD PRODUCT TO CART
const addToCart = async (cid, pid) => {
    console.log(cid, pid);
    const res = await fetch(`/api/cart/${cid}/products/${pid}`, {method: 'POST'});
    //console.log()res)
    const json = await res.json();
    //console.log()json);
    alert(`Product added to cart`);
}