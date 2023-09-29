console.log("OK")


const addToCart = async (cid, pid) => {
    const res = await fetch(`/api/cart/${cid}/products/${pid}`, {method: 'POST'});
    //const json = await res.json();
    console.log(res);
    
    alert(`Product added to cart`);

}

