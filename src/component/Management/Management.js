import React from 'react';
import jsonData from '../../fakeData/products.json';

const Management = () => {
    const postProduct = () =>
    {
        const product = {}
        fetch(`http://localhost:4000/postProduct`,{
            method:"POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(product)
        })
        console.log("clicked")
    }

    return (
        <div>
            <h1>Management</h1>
            <form action="">
                <span>Name : </span><input type="text" placeholder='Name' />
                <span>Price : </span><input type="text" placeholder='price' />
                <span>Quantity : </span><input type="text" placeholder='quantity' />
                <span>attach file : </span><input type="file"  />
            </form>
            <button onClick={postProduct} >add products</button>
        </div>
    );
};

export default Management;