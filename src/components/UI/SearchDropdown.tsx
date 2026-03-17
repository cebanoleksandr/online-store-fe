import { motion } from 'framer-motion';
import { forwardRef, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import type { IProduct } from '../../utils/interfaces';
import { searchProducts } from '../../api/products';
import { Link } from 'react-router-dom';

const SearchDropdown = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchProducts(searchQuery);
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 md:right-12 top-10 mt-2 w-80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-60 p-5 rounded-sm"
    >
      <div className="relative mb-5">
        <input
          className="w-full p-2 pl-3 pr-10 border border-gray-100 rounded-xl bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
          placeholder="Пошук товарів..."
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-3 top-2.5 text-gray-400">
          {isLoading ? (
            <ArrowPathIcon className="w-4 h-4 animate-spin" />
          ) : (
            <MagnifyingGlassIcon className="w-4 h-4" />
          )}
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {results.length > 0 ? (
          results.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="flex items-center gap-4 group cursor-pointer p-1 hover:bg-gray-50 transition-colors"
            >
              <div className="w-14 h-18 bg-gray-50 shrink-0 overflow-hidden">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/56x72"}
                  alt={product.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 border-b border-gray-50 pb-2">
                <h4 className="text-[13px] font-medium leading-tight group-hover:text-gray-600 transition-colors">
                  {product.title}
                </h4>
                <p className="text-sm font-bold mt-1">{product.price} грн</p>
              </div>
            </Link>
          ))
        ) : (
          !isLoading && searchQuery && (
            <p className="text-center text-gray-400 text-sm py-4">Нічого не знайдено</p>
          )
        )}
        
        {!searchQuery && (
          <p className="text-center text-gray-400 text-xs py-2">Введіть назву для пошуку...</p>
        )}
      </div>
    </motion.div>
  );
});

SearchDropdown.displayName = 'SearchDropdown';

export default SearchDropdown;
