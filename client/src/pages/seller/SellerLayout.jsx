import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useContext } from "react";

const SellerLayout = () => {
  const { setIsSeller, navigate } = useContext(AppContext);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  // Logout function without API
  const logout = () => {
    setIsSeller(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <Link to={"/"}>
          <h1 className="text-2xl font-semibold text-orange-600">Grocery Store App</h1>
        </Link>
        <div className="flex items-center gap-5 text-gray-600 text-sm">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full px-4 py-1 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-[95vh] border-gray-300 pt-4 flex flex-col bg-white">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all duration-200
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                    : "hover:bg-gray-100/90 text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Nested Route Content */}
        <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-[95vh]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
