import React, { useEffect, useState } from 'react';
import { clearTheCart, getStoredCart , removeFromDb } from '../../utilities/fakedb';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useNavigate } from 'react-router-dom';
import happy from '../../img/giphy.gif';


const Review = () => {
    const [cart, setCart] = useState([])
    const [PlaceOrder,setPlaceOrder] = useState(false);
    const Navigate = useNavigate()

    const RemoveItem = (productkey) =>
    {
        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
        removeFromDb(productkey);
    }

    useEffect(() => {
        const saveCart = getStoredCart();
        const productkeys = Object.keys(saveCart);

        fetch(`http://localhost:4000/postproductByKey`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productkeys)
        })
        .then (res => res.json())
        .then (data => setCart(data))
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
                    <button className="btn" onClick={()=>Navigate("/shippment")}>Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Review;