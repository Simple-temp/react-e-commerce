import React, { useEffect, useState } from 'react';
import { addToDb , getStoredCart} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    // const showData = jsonData.slice(0,5);
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [search,setSearch] = useState("")

    useEffect(()=>{
        fetch(`http://localhost:4000/getProduct?search=`+search)
        .then( res => res.json())
        .then( data => setProducts(data))
    },[search])

    const searchInput = (event) =>{
        setSearch(event.target.value);
        console.log(event.target.value)
    }

    useEffect(() => {
        const saveCart = getStoredCart();
        const productkey = Object.keys(saveCart);
        fetch(`http://localhost:4000/postproductByKey`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productkey)
        })
        .then (res => res.json())
        .then (data => setCart(data))
    }, [])

    const addProduct = (product) => 
    {
        const pdKey = product.key;
        const smPd = cart.find(pd => pd.key === pdKey);
        let count = 1 ;
        let newCart;
        if(smPd)
        {
            count = smPd.quantity + 1;
            smPd.quantity = count;
            const others = cart.filter(pd => pd.key !== pdKey);
            newCart = [...others, smPd];
        }
        else 
        {
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDb(product.key,count);
    } 
    return (
        <div className="container">
            <input type="text" placeholder='Search..' onBlur={searchInput} />
            <div className="shop-container">
                <div className="product-container">
                    <ul>
                        {
                            products.map(productInfo => <Products CartBtn={true} product={productInfo} key={productInfo.key} addProduct = {addProduct}></Products>)
                        }
                    </ul>
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                    <button className="btn"> <Link to="/review">Review Order</Link></button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};
export default Shop;