import { motion } from 'framer-motion';
import { FaChargingStation, FaLeaf, FaPlug } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="\src\assets\videos\35266-407130741_medium.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl font-bold mb-4" style={{ color: '#8EB03E' }}>Powering the Future</h1>
          <p className="text-xl mb-8">Revolutionizing EV Charging Solutions</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-full"
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold mb-8"
            style={{ color: '#8EB03E' }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaChargingStation className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />, title: "Fast Charging", description: "High-speed charging stations for your convenience." },
              { icon: <FaLeaf className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />, title: "Eco-Friendly", description: "Sustainable energy solutions for a greener planet." },
              { icon: <FaPlug className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />, title: "Easy Access", description: "Wide network of charging stations across the country." },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
                className="p-6 bg-gray-50 rounded-lg shadow-lg cursor-pointer border border-gray-200"
              >
                {service.icon}
                <h3 className="text-2xl font-semibold mb-2" style={{ color: '#8EB03E' }}>{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold mb-8"
            style={{ color: '#8EB03E' }}
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl text-gray-700"
          >
            We are a leading provider of EV charging solutions, dedicated to making electric vehicle charging accessible and efficient.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold mb-8"
            style={{ color: '#8EB03E' }}
          >
            Contact Us
          </motion.h2>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 mb-4 rounded border border-gray-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 mb-4 rounded border border-gray-300"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 mb-4 rounded border border-gray-300"
            />
            <button
              type="submit"
              className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-full"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Home;