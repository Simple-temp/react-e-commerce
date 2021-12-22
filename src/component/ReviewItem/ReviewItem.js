import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    return (
        <div>
            <p> Product Name : {name}</p>
            <p> Quantity : {quantity}</p>
            <p> Price : {price}</p>
            <button className='btn btn-primary' onClick={()=>props.RemoveItem(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;