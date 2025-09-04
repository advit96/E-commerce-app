import React from 'react'
import './App.css'
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';
import PrivateRoute, { AdminRoute } from './components/PrivateRoute';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';
import EditProduct from './pages/EditProduct';

function App() {

  return (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element= { <PrivateRoute> <HomePage /></PrivateRoute>  } />
                        <Route path="/cart"
    element={ <PrivateRoute>
        <CartPage />
    </PrivateRoute> }
  />
<Route path="/product/:id" element={<ProductPage />} />               
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
          <Route path="/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
          <Route path="/admin/products/:id/edit" element={<AdminRoute><EditProduct /></AdminRoute>} />
          </Routes>
        </Router>
        
 );
}

export default App;
