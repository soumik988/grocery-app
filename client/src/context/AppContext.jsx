import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [SearchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch logged-in user on app load to persist login
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const { data } = await axios.get("/api/user/is-auth"); // Correct route from your backend
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };
    fetchLoggedInUser();
  }, []);

  // Fetch seller auth status
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const { data } = await axios.get("/api/seller/is-auth");
        setIsSeller(data.success);
      } catch (error) {
        setIsSeller(false);
        toast.error("Seller auth check failed");
      }
    };
    fetchSeller();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error loading products");
    }
  };

  // Update cart when cartItems or user changes
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (data.success) {
          toast.success("Cart updated successfully");
        } else {
          toast.error(data.message || "Failed to update cart");
        }
      } catch (error) {
        toast.error(error.message || "Error updating cart");
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems, user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Cart functions
  const addToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id] > 1) {
        updatedCart[id] -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  const updateCartItem = (id, newQty) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: newQty,
    }));
  };

  const getCartCount = () =>
    Object.values(cartItems || {}).reduce((sum, qty) => sum + qty, 0);

  const totalCartAmount = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      return product ? total + product.offerPrice * qty : total;
    }, 0);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        getCartCount,
        totalCartAmount,
        navigate,
        products,
        setProducts,
        SearchQuery,
        setSearchQuery,
        axios,
        fetchProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
