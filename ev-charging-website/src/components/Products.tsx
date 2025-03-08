import { motion } from 'framer-motion';


import homeChargerImage from '../assets/images/home-charger.jpg'; 
import publicChargerImage from '../assets/images/public-charger.jpg'; 
import portableChargerImage from '../assets/images/portable-charger.jpg';

const Products = () => {
  const products = [
    {
      image: homeChargerImage,
      title: "Home Chargers",
      description: "Efficient and compact chargers for home use.",
      buyLink: "/buy/home-chargers",
      sellLink: "/sell/home-chargers",
    },
    {
      image: publicChargerImage,
      title: "Public Chargers",
      description: "High-speed chargers for public spaces.",
      buyLink: "/buy/public-chargers",
      sellLink: "/sell/public-chargers",
    },
    {
      image: portableChargerImage,
      title: "Portable Chargers",
      description: "On-the-go charging solutions for EVs.",
      buyLink: "/buy/portable-chargers",
      sellLink: "/sell/portable-chargers",
    },
  ];

  return (
    <section className="py-40 bg-gray-50">
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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
              className="p-6 bg-white rounded-lg shadow-lg cursor-pointer border border-gray-200 hover:border-[#8EB03E] transition-all"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-2xl font-semibold mb-2" style={{ color: '#8EB03E' }}>{product.title}</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex justify-center gap-4">
                <a
                  href={product.buyLink}
                  className="inline-block bg-[#8EB03E] text-white hover:bg-[#7A9C2F] py-2 px-6 rounded-full font-semibold"
                >
                  Buy Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
