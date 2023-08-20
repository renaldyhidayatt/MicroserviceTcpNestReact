import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LayoutAuth from './components/LayoutAuth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import My404 from './pages/My404';
import Layouts from './components/Layout';
import Dashboard from './pages/admin/Dashboard';
import UserPage from './pages/admin/User';
import Modal from './pages/admin/Modal';
import EditUserPage from './pages/admin/User/Edit';
import RolePage from './pages/admin/Role';
import SliderPage from './pages/admin/Slider';
import EditSliderPage from './pages/admin/Slider/Edit';
import EditRolePage from './pages/admin/Role/Edit';
import ProductPage from './pages/admin/Product';
import EditProductPage from './pages/admin/Product/Edit';
import CategoryPage from './pages/admin/Category';
import EditCategoryPage from './pages/admin/Category/Edit';
import OrderPage from './pages/admin/Order';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutAuth />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/admin" element={<Layouts />}>
            <Route index element={<Dashboard />} />
            <Route path="role" element={<RolePage />} />
            <Route path="role/edit/:id" element={<EditRolePage />} />
            <Route path="slider" element={<SliderPage />} />
            <Route path="slider/edit/:id" element={<EditSliderPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="product/edit/:id" element={<EditProductPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="category/edit/:id" element={<EditCategoryPage />} />
            <Route path="order" element={<OrderPage />} />

            <Route path="user" element={<UserPage />} />
            <Route path="user/edit/:id" element={<EditUserPage />} />
          </Route>
          <Route path="*" element={<My404 />} />
        </Routes>
        <Modal />
      </BrowserRouter>
    </>
  );
}

export default App;
