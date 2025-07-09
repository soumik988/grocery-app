import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import MyOrders from "./pages/MyOrders";
import Auth from "./models/Auth";
import ProductCategroy from "./pages/ProductCategroy";
import Fotter from "./components/Fotter";
import { Toaster } from "react-hot-toast";
import AddAddress from "./pages/AddAddress"; // ✅ Correct spelling

import SellerLayout from "./pages/seller/SellerLayout";
import SellerLogin from "./components/seller/SellerLogin";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

const App = () => {
  const { isSeller, showUserLogin } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div className="text-default min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1e1e2f",
            color: "#fff",
            border: "1px solid #4c4c8a",
          },
        }}
      />

      {!isSellerPath && <Navbar />}
      {showUserLogin && <Auth />}

      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/products/:category" element={<ProductCategroy />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/add-address" element={<AddAddress />} />


          <Route
            path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}


          >

            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list'
              element={isSeller ? <ProductList /> : null} />
            <Route path='orders'
              element={isSeller ? <Orders /> : null} />


          </Route>





        </Routes>
      </div>

      {!isSellerPath && <Fotter />}
    </div>
  );
};

export default App;
