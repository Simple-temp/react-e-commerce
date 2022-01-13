import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Products/Products';

const ProductDetails = () => {
    const {productkey} = useParams();
    const [product,setproduct] = useState({})

    useEffect(()=>{
        fetch(`http://localhost:4000/getSelectedProduct`+ productkey)
        .then ( res => res.json())
        .then ( data => setproduct(data))
    },[productkey])

    return (
        <div>
            <h1>Product Details : </h1>
            <Products product={product} CartBtn={false}></Products>
        </div>
    );
};

export default ProductDetails;