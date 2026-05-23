import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import SearchFilter from './pages/SearchFilter';
import Navbar from './components/layouts/Navbar';
import Cart from "./pages/Cart.jsx";
import Login from './pages/Login.jsx';
import Signup from './pages/SignUp.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Checkout from './pages/Checkout.jsx';
import OrderHistory from "./pages/OrderHistory";
import AdminLogin from './pages/AdminLogin.jsx';
import AdminRoute from './routes/AdminRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import EditProduct from './pages/EditProduct.jsx';
import AddProduct from './pages/AddProduct.jsx';

function App() {
  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/search' element={<SearchFilter />}></Route>
        <Route path='/products/:id' element={<ProductDetails />}></Route>

        <Route path='/cart'
          element={<ProtectedRoute>
            <Cart />
          </ProtectedRoute>} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/checkout' element={<ProtectedRoute>
          <Checkout />
        </ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute>
          <OrderHistory />
        </ProtectedRoute>} />

        <Route path='/admin/login' element={<AdminLogin />} />

        <Route path='/admin/dashboard' element={<AdminRoute>
          <AdminDashboard />
        </AdminRoute>} />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>
              <AddProduct/>
            </AdminRoute>
          }
        />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000} />
    </>
    // <div>
    // </div>
  );
}

export default App;
