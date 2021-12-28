import React from 'react';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { userCOntext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [LoggedInUser] = useContext( userCOntext);
    return (
        <Routes>
                <Route
                    {...rest}
                    render={({ location }) =>
                    LoggedInUser ? (
                        children
                    ) : (
                        <Navigate
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                        />
                    )
                    }
                />
        </Routes>
    );
};

export default PrivateRoute;