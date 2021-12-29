import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userCOntext } from '../../App';

const PrivateRoute = ({ children }) => {
    const [LoggedInUser] = useContext( userCOntext);
    const location = useLocation();
    if(!LoggedInUser.email)
    {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
};

export default PrivateRoute;