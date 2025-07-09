import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { products, navigate, addToCart } = useContext(AppContext);
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);

  // Find product
  const product = products.find((p) => p._id === id || p.id === id);

  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(`http://localhost:5000/images/${product.image[0]}`);
    }
  }, [product]);

  if (!product) return <p>Loading product or product not found...</p>;

  const productId = product._id || product.id;

  const handleAddToCart = () => {
    addToCart(productId);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(productId);
    toast.success(`Added ${product.name} to cart! Redirecting to cart...`);
    navigate("/cart");
  };

  return (
    <div className="mt-16">
      <p>
        <Link to="/">Home</Link> /
        <Link to="/products"> Products</Link> /
        <Link to={`/products/${product.category?.toLowerCase() || "all"}`}> {product.category}</Link> /
        <span className="text-indigo-500"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {(product.image || []).map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(`http://localhost:5000/images/${image}`)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={`http://localhost:5000/images/${image}`} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Main Preview */}
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img src={thumbnail} alt="Selected product" />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          {/* Rating */}
          <div className="flex gap-1 mt-2">
            {Array(5).fill("").map((_, i) => (
              <img
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                key={i}
                className="w-3.5 md:w-4"
              />
            ))}
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">MRP: ${product.price}</p>
            <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {(product.description || []).map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
