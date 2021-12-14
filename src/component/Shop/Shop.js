import React, { useState } from 'react';
import jsonData from '../../fakeData/products.json';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css';

const Shop = () => {
    const showData = jsonData.slice(0,4);
    const [products,setProducts] = useState(showData);
    const [cart,setCart] = useState([]);

    const addProduct = (product) => 
    {
        const newCount = [...cart,product];
        setCart(newCount);
    }
    return (
        <div className="container">
            <div className="shop-container">
                <div className="product-container">
                    <ul>
                        {
                            products.map(productInfo => <Products product={productInfo} key={productInfo.id} addProduct = {addProduct}></Products>)
                        }
                    </ul>
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};
export default Shop;