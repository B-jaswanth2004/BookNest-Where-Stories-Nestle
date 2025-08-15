import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from '../Pages/HomePage';
import ProfilePage from '../Pages/ProfilePage';
import BooksPage from '../Pages/BooksPage';
import CartPage from '../Pages/CartPage';
import OrdersPage from '../Pages/OrdersPage';
import OrderConfirmationPage from '../Pages/OrderConfirmationPage';
import Signup from '../Pages/Signup';
import LoginPage from '../Pages/LoginPage';
import BrowseBooks from '../Pages/BrowseBooks';
import SellerDashboard from '../Pages/sellerDashboard';
import AdminDashboard from '../Pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import './styles/index.css';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/books" element={<BooksPage />} /> 
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/confirm-order" element={<OrderConfirmationPage />} />
        <Route path = "/signup" element={<Signup/>}/>

      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      <Route path="/seller-dashboard" element={<SellerDashboard />} /> */}
        <Route path="/browse" element={<BrowseBooks/>} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />


        <Route path = "/seller-dashboard" element={<SellerDashboard/>}/>
        <Route path = "/admin" element={<AdminDashboard/>}/>

        <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/seller" element={
              <ProtectedRoute role="seller">
                <SellerDashboard />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute role="user">
                <ProfilePage />
              </ProtectedRoute>
            } />

      </Routes>
    </>
  );
}

export default App;
