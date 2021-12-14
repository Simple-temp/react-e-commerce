import React from 'react';
import logo from '../../img/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="container inner">
                <nav>
                    <a href="/shop">Shop</a>
                    <a href="/review">Review</a>
                    <a href="/management">Management</a>
                </nav>
                <div className="inputArea">
                    <div className="inputBox">
                        <input type="text" placeholder='Type Your Category' className='inputValue' />
                    </div>
                    <button className='btn'>Search</button>
                </div>
            </div>
        </div>
    );
};

export default Header;