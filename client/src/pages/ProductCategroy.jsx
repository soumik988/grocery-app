import React, { useContext } from "react";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { products } = useContext(AppContext);
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="mt-16 px-4">
      {searchCategory && (
        <div className="flex flex-col items-end w-max mb-6">
          <h1 className="text-3xl md:text-4xl font-medium">
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-600">
            No products found
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
