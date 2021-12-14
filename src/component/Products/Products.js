import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Products = (props) => {
    console.log(props);
    const {name,seller,price,stock,img,category} = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <span>{name}</span>
                <p className="seller">{seller}</p>
                <p>Product Category : {category}</p>
                <p>${price}</p>
                <p>Only {stock} Left instock - Order soon</p>
                <br/>
                <button className="btn" onClick={()=>props.addProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} className="cart2"/>Add to Cart</button>
            </div>
        </div>
    );
};

export default Products;