import { motion } from 'framer-motion';
import { FaChargingStation, FaLeaf, FaPlug, FaStar, FaQuoteLeft, FaBolt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <section className="h-screen flex items-center justify-center relative overflow-hidden">       
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="\src\assets\videos\video4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

       
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-8xl font-bold mb-4 text-white"
          >
            Powering the Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl mb-8 text-white"
          >
            Revolutionizing EV Charging Solutions
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-full"
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      
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
                className="p-6 bg-gray-50 rounded-lg shadow-lg cursor-pointer border border-gray-200 hover:border-[#8EB03E] transition-all"
              >
                {service.icon}
                <h3 className="text-2xl font-semibold mb-2" style={{ color: '#8EB03E' }}>{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
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
            {[
              { icon: <FaChargingStation className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />, title: "Home Chargers", description: "Efficient and compact chargers for home use." },
              { icon: <FaPlug className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />, title: "Public Chargers", description: "High-speed chargers for public spaces." },
              { icon: <FaBolt className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />, title: "Portable Chargers", description: "On-the-go charging solutions for EVs." },
            ].map((product, index) => (
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
                <p className="text-gray-700">{product.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold mb-8"
            style={{ color: '#8EB03E' }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "David Hamar", review: "Amazing service and fast charging stations!", rating: 5 },
              { name: "Dimantcos", review: "Eco-friendly and reliable. Highly recommend!", rating: 5 },
              { name: "Messi baoli", review: "Great experience with their portable chargers.", rating: 4 },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-200"
              >
                <FaQuoteLeft className="w-8 h-8 mb-4" style={{ color: '#8EB03E' }} />
                <p className="text-gray-700 mb-4">{testimonial.review}</p>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-semibold" style={{ color: '#8EB03E' }}>{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-gradient-to-r from-[#8EB03E] to-[#6A8F2E]">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold mb-8 text-white"
          >
            Ready to Power Your Future?
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-full"
          >
            Get Started
          </motion.button>
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
            className="text-xl text-gray-700 max-w-2xl mx-auto"
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
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
            />
            <button
              type="submit"
              className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-full transition-all"
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