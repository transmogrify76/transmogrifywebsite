import { motion } from 'framer-motion';
import { FaBolt, FaCar, FaChargingStation } from 'react-icons/fa';

const Products = () => {
  const products = [
    {
      icon: <FaChargingStation className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
      title: "Home Chargers",
      description: "Efficient and compact chargers for home use.",
      link: "/products/home-chargers",
    },
    {
      icon: <FaCar className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
      title: "Public Chargers",
      description: "High-speed chargers for public spaces.",
      link: "/products/public-chargers",
    },
    {
      icon: <FaBolt className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
      title: "Portable Chargers",
      description: "On-the-go charging solutions for EVs.",
      link: "/products/portable-chargers",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-8"
          style={{ color: '#8EB03E' }}
        >
          Our Products
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
              className="p-6 bg-white rounded-lg shadow-lg cursor-pointer border border-gray-200 hover:border-[#8EB03E] transition-all"
            >
              {product.icon}
              <h3 className="text-2xl font-semibold mb-2" style={{ color: '#8EB03E' }}>{product.title}</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <a
                href={product.link}
                className="text-[#FFA500] hover:text-[#FF8C00] font-semibold"
              >
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;