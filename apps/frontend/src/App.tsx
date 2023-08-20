import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';

import Footer from './components/Footer';
import ProductPage from './pages/Product';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import PrivateRoute from './route/PrivateRoute';
import ProfilePage from './pages/Profile';
import CartPage from './pages/Cart';
import CheckoutForm from './pages/Checkout';
import OrderPage from './pages/Order';
import CategoryPage from './pages/Category';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route path="/checkout" element={<CheckoutForm />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
