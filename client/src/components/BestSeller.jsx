import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from './ProductCard';

const BestSeller = () => {
  const { products } = useContext(AppContext);

  if (!products || !Array.isArray(products)) {
    return (
      <div className="text-center mt-10 text-gray-400">
        Loading Best Sellers...
      </div>
    );
  }

  const bestSellers = products.filter((product) => product.inStock).slice(0, 5);

  if (bestSellers.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No best-selling products available.
      </div>
    );
  }

  return (
    <div className='mt-16'>
      <p className='text-2xl font-medium md:text-3xl mb-4'>BestSellers</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {bestSellers.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
