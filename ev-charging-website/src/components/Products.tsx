import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Define the Product type based on the API response
interface Product {
  id: string;
  name: string;
  model: string;
  details: {
    phase: string;
    height: number;
    length: number;
    breadth: number;
    cooling: string;
    current: string;
    voltage: string;
    frequency: string;
    protection: string;
    noise_level: string;
    rated_power: string;
    fast_charger: string;
    communication: string;
    weight_in_kgs: number;
    additional_details: string | null;
    ingress_protection: string;
    effiiency_in_percentage: number;
    maximum_operating_temperature: number;
    minimum_operating_temperature: number;
  };
  is_listed: boolean;
  image_paths: string[];
  quantity: number;
  price: number;
}

// API Key
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products from the API and store them in both products and allProducts state
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/products/all', {
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data: Product[] = await response.json();
      setProducts(data);
      setAllProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Search products by query
  const searchProducts = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/products/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({ query, limit: 10 }),
      });
      if (!response.ok) throw new Error('Search failed');
      const data: Product[] = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search input with debounce
  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        searchProducts(searchQuery);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      // When searchQuery is empty, reuse the cached allProducts
      setProducts(allProducts);
    }
  }, [searchQuery, allProducts]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-50 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-[#8EB03E]/30 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E]/20 outline-none transition-all"
            />
            <FaSearch className="absolute left-4 top-5 text-[#8EB03E] text-xl" />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaSpinner className="text-4xl text-[#8EB03E] mx-auto" />
            </motion.div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">Error: {error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products found</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(142, 176, 62, 0.2)',
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-48 bg-gray-100">
                  {product.image_paths?.length > 0 ? (
                    <motion.img
                      src={product.image_paths[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#8EB03E]">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">{product.model}</span>
                    <span className="text-lg font-semibold text-[#8EB03E]">${product.price}</span>
                  </div>
                  <div className="text-gray-600 text-sm mb-4">
                    <p>
                      <strong>Voltage:</strong> {product.details.voltage}
                    </p>
                    <p>
                      <strong>Current:</strong> {product.details.current}
                    </p>
                    <p>
                      <strong>Rated Power:</strong> {product.details.rated_power}
                    </p>
                    <p>
                      <strong>Weight:</strong> {product.details.weight_in_kgs} kg
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.quantity > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-[#8EB03E] hover:bg-[#7A9C2F] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Products;