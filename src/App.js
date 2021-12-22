import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import Review from './component/Review/Review';
import Management from './component/Management/Management';
import Notfound from './component/Notfound/Notfound';
import ProductDetails from './component/ProductDetails/ProductDetails';

function App() {
  return (
    <>
      <Router>
      <Header></Header>

        <div className="container">
        <Routes>
                <Route path="/" element={<Shop/>}/>
                <Route path="/review" element={<Review/>}/>
                <Route path="/management" element={<Management/>}/>
                <Route path="/product/:productkey" element={<ProductDetails/>}/>
                <Route path="*" element={<Notfound/>}/>
          </Routes>
        </div>
        
      </Router>
    </>
  );
}

export default App;
