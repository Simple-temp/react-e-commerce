import React, { useEffect, useState } from 'react';
import { clearTheCart, getStoredCart , removeFromDb } from '../../utilities/fakedb';
import jsonData from '../../fakeData/products.json';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import happy from '../../img/giphy.gif';

const Review = () => {

    const [cart, setCart] = useState([])
    const [PlaceOrder,setPlaceOrder] = useState(false);

    const clearItem = () =>
    {
        setCart([]);
        setPlaceOrder(true);
        clearTheCart();
    }

    const RemoveItem = (productkey) =>
    {
        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
        removeFromDb(productkey);
    }

    useEffect(() => {
        const saveCart = getStoredCart();
        const productkeys = Object.keys(saveCart);
        const cartproducts = productkeys.map ( key => {
            const product = jsonData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartproducts);
    }, [])
    
    let thankYou;
    if(PlaceOrder)
    {
        thankYou = <img src={happy} alt="" className='img-fluid'/>
    }
    return (
        <div>
            <div className="row">
                <div className="col-lg-6">
                {
                cart.map( pd => <ReviewItem product={pd} key={pd.key} RemoveItem={RemoveItem}></ReviewItem> )
                }
                { thankYou }
                </div>
                <div className="col-lg-6">
                    <Cart cart={cart}>
                    <button className="btn"> <Link to="/review" onClick={clearItem}>Place Orderd</Link></button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Review;