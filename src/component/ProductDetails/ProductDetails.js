import React from 'react';
import { useParams } from 'react-router-dom';
import jsonData from '../../fakeData/products.json';
import Products from '../Products/Products';

const ProductDetails = () => {
    const {productkey} = useParams();
    const findProduct = jsonData.find(pd => pd.key === productkey);
    console.log(findProduct);
    return (
        <div>
            <h1>Product Details : </h1>
            <Products product={findProduct} CartBtn={false}></Products>
        </div>
    );
};

export default ProductDetails;