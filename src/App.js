import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import Review from './component/Review/Review';
import Management from './component/Management/Management';
import Notfound from './component/Notfound/Notfound';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Shippment from './component/Shippment/Shippment';
import Login from './component/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const userCOntext = createContext();

function App() {
  const [LoggedInUser, setLoggedInUser] = useState({})
  return (
    <userCOntext.Provider value={[LoggedInUser, setLoggedInUser]}>
      <Router>
        <h3> email : {LoggedInUser.email}</h3>
      <Header></Header>

        <div className="container">
        <Routes>
                <Route path="/" element={<Shop/>}/>
                <Route path="/review" element={<Review/>}/>
                <Route path="/management" element={ <PrivateRoute>
                  <Management/>
                </PrivateRoute> }/>
                <Route path="/product/:productkey" element={<ProductDetails/>}/>
                <Route path="/shippment" element={ <PrivateRoute>
                  <Shippment/>
                </PrivateRoute> }/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Notfound/>}/>
        </Routes>
        </div>
        
      </Router>
    </userCOntext.Provider>
  );
}

export default App;
