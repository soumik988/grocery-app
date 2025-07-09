import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products, SearchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (SearchQuery.trim().length > 0) {
      const searchResults = products.filter((product) =>
        product.name.toLowerCase().includes(SearchQuery.toLowerCase())
      );
      setFilteredProducts(searchResults);
    } else {
      setFilteredProducts(products);
    }
  }, [products, SearchQuery]);

  // Filter products that are in stock or don't have instock defined
  const visibleProducts = filteredProducts.filter(
    (product) => product.instock !== false
  );

  return (
    <div className='mt-10 px-4'>
      <h1 className='text-3xl lg:text-4xl font-medium text-white mb-6'>All Products</h1>

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-6 text-center">No products in stock found.</p>
      )}
    </div>
  );
};

export default Products;
