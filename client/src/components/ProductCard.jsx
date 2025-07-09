import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { navigate, cartItems, addToCart, removeFromCart } = useContext(AppContext);

  if (!product) return null;

  const handleCardClick = () => {
    if (!product?._id) {
      toast.error("Product data is incomplete");
      return;
    }

    // Fallback 'uncategorized' only for navigation URL
    const category = product?.category ? product.category.toLowerCase() : 'uncategorized';

    navigate(`/product/${category}/${product._id}`);
    scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product._id);
    toast.success(`${product.name} added to cart`);
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    removeFromCart(product._id);
    toast.error(`${product.name} removed from cart`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full cursor-pointer hover:shadow-md transition"
    >
      {/* Product Image */}
      <div className="group flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={`http://localhost:5000/images/${product?.image?.[0]}`}
          alt={product?.name || "Product"}
        />
      </div>

      {/* Product Info */}
      <div className="text-gray-500/60 text-sm">
        {/* Show category normally, or empty if missing */}
        <p>{product?.category || ""}</p>

        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product?.name || "Unnamed Product"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {Array(5).fill("").map((_, i) => (
            <img
              key={i}
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt="rating"
              className="w-3 md:w-3.5"
            />
          ))}
          <p>(4)</p>
        </div>

        {/* Price and Cart Actions */}
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            ${product.offerPrice}
            <span className="text-gray-500/60 md:text-sm text-xs line-through ml-1">
              ${product.price}
            </span>
          </p>

          <div onClick={(e) => e.stopPropagation()} className="text-indigo-500">
            {!cartItems?.[product._id] ? (
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium cursor-pointer"
              >
                <img src={assets.cart_icon} alt="cart icon" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                <button
                  onClick={handleRemoveFromCart}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
