import { motion } from 'framer-motion';
import { 
  FaChargingStation, 
  FaLeaf, 
  FaPlug, 
  FaStar, 
  FaQuoteLeft, 
  FaBolt,
  FaHandsHelping,
  FaLightbulb,
  FaHeadset,
} from 'react-icons/fa';

// Make sure to include the following in your index.html head for cool fonts:
// <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900 font-montserrat">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/src/assets/videos/video4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay for modern look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-4 text-white drop-shadow-lg"
          >
            Powering the Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Revolutionizing EV Charging Solutions
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full shadow-lg transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* How We Can Help Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: '#8EB03E' }}
          >
            How We Can Help
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <FaLightbulb className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
                title: "Expertise",
                description: "Industry-leading knowledge in EV infrastructure development",
                bg: "bg-gray-100"
              },
              { 
                icon: <FaHandsHelping className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
                title: "Guidance",
                description: "End-to-end support from planning to implementation",
                bg: "bg-gradient-to-br from-green-400 to-green-600 text-white"
              },
              { 
                icon: <FaHeadset className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
                title: "Support",
                description: "24/7 technical support and maintenance services",
                bg: "bg-gray-100"
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`p-10 rounded-2xl shadow-xl transition-all ${service.bg} hover:shadow-2xl`}
              >
                <div className="flex justify-center">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charger Display Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: '#8EB03E' }}
          >
            Our Charger Portfolio
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group"
              >
                <motion.img
                  src={`/charger-${item}.jpg`}
                  alt={`Charger ${item}`}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100"
                >
                  <h3 className="text-2xl font-semibold mb-2">Charger Model {item}</h3>
                  <div className="flex items-center mb-3">
                    <FaBolt className="text-orange-400 mr-2" />
                    <span className="text-sm">150kW Fast Charging</span>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full">
                    View Details
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: '#8EB03E' }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                className="p-8 bg-gray-100 rounded-lg shadow-lg cursor-pointer border border-gray-200 hover:border-green-500 transition-all"
              >
                {service.icon}
                <h3 className="text-2xl font-semibold mb-3" style={{ color: '#8EB03E' }}>{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: '#8EB03E' }}
          >
            Our Products
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                className="p-8 bg-white rounded-lg shadow-lg cursor-pointer border border-gray-200 hover:border-green-500 transition-all"
              >
                {product.icon}
                <h3 className="text-2xl font-semibold mb-3" style={{ color: '#8EB03E' }}>{product.title}</h3>
                <p className="text-gray-700">{product.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: '#8EB03E' }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                className="p-8 bg-gray-100 rounded-lg shadow-lg border border-gray-200"
              >
                <FaQuoteLeft className="w-8 h-8 mb-4" style={{ color: '#8EB03E' }} />
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-700">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-white"
          >
            Ready to Power Your Future?
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full shadow-lg transition-all"
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: '#8EB03E' }}
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            We are a leading provider of EV charging solutions, dedicated to making electric vehicle charging accessible, efficient, and sustainable.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: '#8EB03E' }}
          >
            Contact Us
          </motion.h2>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-lg mx-auto space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full transition-all"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Home;
