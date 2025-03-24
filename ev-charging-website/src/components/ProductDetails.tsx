import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
  image_paths: string[] | null;  // Make sure image_paths can be null
  quantity: number;
  price: number;
}

const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8000/products/get_by_id/${productId}`, {
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch product details');
        const data: Product = await res.json();
        setProduct(data);
        if (data.image_paths && data.image_paths.length > 0) {
          setMainImage(`http://localhost:8000/${data.image_paths[0]}`);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaSpinner className="text-4xl text-[#8EB03E]" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-40 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-40 text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 md:p-12 lg:p-50"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 p-6">
            {mainImage ? (
              <motion.img
                src={mainImage}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            {Array.isArray(product.image_paths) && product.image_paths.length > 1 ? (
              <div className="mt-4 flex space-x-2 overflow-x-auto">
                {product.image_paths.map((path, index) => (
                  <motion.img
                    key={index}
                    src={`http://localhost:8000/${path}`}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setMainImage(`http://localhost:8000/${path}`)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-20 bg-gray-100 rounded-lg">
                <span className="text-gray-500">No additional images available</span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-4 text-[#8EB03E]"
            >
              {product.name}
            </motion.h1>

            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Model:</span> {product.model}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Voltage:</span> {product.details.voltage}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Current:</span> {product.details.current}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Rated Power:</span> {product.details.rated_power}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Weight:</span> {product.details.weight_in_kgs} kg
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Price:</span> ${product.price}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mt-6">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  product.quantity > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-6 py-3 bg-[#8EB03E] text-white rounded-full font-semibold hover:bg-[#7A9C2F] transition-colors"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
