import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    let total = 0;
    for(var i=0; i<cart.length; i++)
    {
        var product = cart[i];
        total = total + product.price * product.quantity;
    }
    console.log(product);

    let shipping = 0;
    if (total > 80)
    {
        shipping=12.69;
    }
    else if (total > 200)
    {
        shipping=24.99;
    }
    else if (total > 400)
    {
        shipping=35.69;
    }


    const tax = (total/10) ;
    const finalPrice = (total + shipping+tax).toFixed(2);

    return (
        <div className="cart-box">
            <p className='cart'><FontAwesomeIcon icon={faShoppingCart} className="cart" />{cart.length}</p>
            <p>Product price : {total.toFixed(2)}</p>
            <p>Shipping Chagrge : {shipping.toFixed(2)}</p>
            <p>Tax + Vat : {tax.toFixed(2)}</p>
            <p>Total : {finalPrice}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;