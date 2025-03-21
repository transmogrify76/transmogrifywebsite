import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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

const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.user_id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

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

  const handleAddToCart = async (productId: string, price: number) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      setCartItems(prev => ({ ...prev, [productId]: 1 }));
      const response = await fetch('http://localhost:8000/cart/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({
          user_id: userId,
          productid: productId,
          price: price.toString(),
        }),
      });
      
      if (!response.ok) throw new Error('Failed to add to cart');
    } catch (error) {
      setCartItems(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
      alert('Failed to add to cart');
    }
  };

  const handleQuantityChange = async (productId: string, action: 'increase' | 'decrease') => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Please login to modify cart');
      return;
    }

    try {
      setCartItems(prev => {
        const currentQty = prev[productId] || 0;
        const newQty = action === 'increase' ? currentQty + 1 : currentQty - 1;
        
        if (newQty < 0) return prev;
        if (newQty === 0) {
          const newState = { ...prev };
          delete newState[productId];
          return newState;
        }
        
        return { ...prev, [productId]: newQty };
      });

      const endpoint = action === 'increase' 
        ? 'increasequantity' 
        : 'decreasemethods';

      const response = await fetch(`http://localhost:8000/cart/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify({ productid: productId }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} quantity`);
    } catch (error) {
      setCartItems(prev => {
        const currentQty = prev[productId] || 0;
        const restoredQty = action === 'increase' ? currentQty - 1 : currentQty + 1;
        return { ...prev, [productId]: restoredQty };
      });
      alert(`Failed to ${action} quantity`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        const searchProducts = async () => {
          setLoading(true);
          try {
            const response = await fetch('http://localhost:8000/products/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'API-KEY': API_KEY,
              },
              body: JSON.stringify({ query: searchQuery, limit: 10 }),
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
        searchProducts();
      }, 500);
      return () => clearTimeout(timer);
    } else {
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
                    <span className="text-lg font-semibold text-[#8EB03E]">{product.price}</span>
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
                    <div className="flex items-center gap-2">
                      {product.quantity > 0 && (
                        cartItems[product.id] ? (
                          <div className="flex items-center gap-2 bg-[#8EB03E]/10 rounded-full px-3 py-1">
                            <button
                              onClick={() => handleQuantityChange(product.id, 'decrease')}
                              className="text-[#8EB03E] hover:bg-[#8EB03E]/20 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-[#8EB03E] font-medium">
                              {cartItems[product.id]}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(product.id, 'increase')}
                              className="text-[#8EB03E] hover:bg-[#8EB03E]/20 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product.id, product.price)}
                            className="bg-[#8EB03E] hover:bg-[#7A9C2F] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                          >
                            Add to Cart
                          </button>
                        )
                      )}
                      <Link
                        to={`/products/${product.id}`}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        Details
                      </Link>

                      <Link to="/cart" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                        Cart
                      </Link>

                    </div>
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