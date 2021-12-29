import {Link} from 'react-router-dom';
import React from 'react';
import logo from '../../img/logo.png';
import './Header.css';
import { useContext } from 'react';
import { userCOntext } from '../../App';

const Header = () => {
    const [LoggedInUser, setLoggedInUser] = useContext ( userCOntext )
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="container inner">
                <nav>
                    <Link to="/">Shop</Link>
                    <Link to="/review">Review</Link>
                    <Link to="/management">Management</Link>
                    <button onClick={()=>setLoggedInUser({})} >Sign Out</button>
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