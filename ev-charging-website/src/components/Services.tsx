import { FaChargingStation, FaLeaf, FaPlug } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { icon: <FaChargingStation className="w-12 h-12 mb-4" />, title: "Fast Charging", description: "High-speed charging stations for your convenience." },
    { icon: <FaLeaf className="w-12 h-12 mb-4" />, title: "Eco-Friendly", description: "Sustainable energy solutions for a greener planet." },
    { icon: <FaPlug className="w-12 h-12 mb-4" />, title: "Easy Access", description: "Wide network of charging stations across the country." },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
              className="p-6 bg-white rounded-lg shadow-lg cursor-pointer"
            >
              {service.icon}
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;