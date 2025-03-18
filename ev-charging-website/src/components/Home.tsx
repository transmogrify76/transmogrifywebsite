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

const Home = () => {
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-montserrat overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <source src="/src/assets/videos/video4.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.5,
              duration: 1,
              type: "spring",
              stiffness: 100
            }}
            className="text-6xl md:text-8xl font-bold mb-4 text-white drop-shadow-2xl"
          >
            Powering the <span className="text-[#8EB03E]">Future</span>
          </motion.h1>
          
          <motion.div
            variants={floatingVariants}
            animate="float"
            className="mb-8"
          >
            <FaBolt className="text-6xl text-[#8EB03E] mx-auto" />
          </motion.div>
          
          <motion.button
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 25px rgba(142, 176, 62, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#8EB03E] to-[#6E8E38] hover:from-[#6E8E38] hover:to-[#8EB03E] text-white px-12 py-5 rounded-full shadow-2xl transition-all text-xl font-semibold"
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
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#8EB03E] to-[#A0C04A] bg-clip-text text-transparent"
          >
            How We Can Help
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaLightbulb className="w-12 h-12" />,
                title: "Expertise",
                description: "Industry-leading knowledge in EV infrastructure development",
                color: "from-[#8EB03E]/10 to-[#8EB03E]/5"
              },
              {
                icon: <FaHandsHelping className="w-12 h-12" />,
                title: "Guidance",
                description: "End-to-end support from planning to implementation",
                color: "from-[#8EB03E] to-[#6E8E38]"
              },
              {
                icon: <FaHeadset className="w-12 h-12" />,
                title: "Support",
                description: "24/7 technical support and maintenance services",
                color: "from-[#8EB03E]/5 to-[#8EB03E]/10"
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  rotate: index % 2 === 0 ? 2 : -2,
                }}
                className={`bg-gradient-to-br ${service.color} p-8 rounded-3xl shadow-2xl hover:shadow-3xl relative overflow-hidden group`}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(142, 176, 62, 0.2), transparent)"
                  }}
                />
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="text-[#8EB03E]"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    {service.icon}
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charger Portfolio Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-[#8EB03E] to-[#A0C04A] bg-clip-text text-transparent"
          >
            Our Charger Portfolio
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: item % 2 === 0 ? 1 : -1
                }}
                transition={{ type: "spring", stiffness: 150 }}
                className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl group perspective-1000"
              >
                <motion.div
                  className="relative h-56 overflow-hidden"
                  whileHover={{ rotateX: 5, rotateY: item % 2 === 0 ? 5 : -5 }}
                >
                  <motion.img
                    src={`https://picsum.photos/400/300?random=${item}`}
                    alt={`EV Charger ${item}`}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end items-center p-6"
                >
                  <h3 className="text-2xl font-semibold mb-2 text-white">Charger Model {item}</h3>
                  <div className="flex items-center mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FaBolt className="text-[#8EB03E] mr-2 text-xl" />
                    </motion.div>
                    <span className="text-sm text-gray-200">150kW Fast Charging</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#8EB03E] hover:bg-[#6E8E38] px-6 py-2 rounded-full text-white flex items-center gap-2"
                  >
                    <span>View Details</span>
                    <motion.span
                      animate={{ x: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
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
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#8EB03E] to-[#A0C04A] bg-clip-text text-transparent"
          >
            Our Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <FaChargingStation className="w-12 h-12" />,
                title: "Fast Charging", 
                description: "High-speed charging stations for your convenience." 
              },
              { 
                icon: <FaLeaf className="w-12 h-12" />,
                title: "Eco-Friendly", 
                description: "Sustainable energy solutions for a greener planet." 
              },
              { 
                icon: <FaPlug className="w-12 h-12" />,
                title: "Easy Access", 
                description: "Wide network of charging stations across the country." 
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 2 : -2
                }}
                className="p-8 bg-gradient-to-br from-[#8EB03E]/10 to-[#8EB03E]/5 rounded-3xl shadow-2xl cursor-pointer border-2 border-[#8EB03E]/20 hover:border-[#8EB03E]/40 transition-all"
              >
                <motion.div 
                  className="text-[#8EB03E] mb-6"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
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
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#8EB03E] to-[#A0C04A] bg-clip-text text-transparent"
          >
            Our Products
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <FaChargingStation className="w-12 h-12" />,
                title: "Home Chargers", 
                description: "Efficient and compact chargers for home use." 
              },
              { 
                icon: <FaPlug className="w-12 h-12" />,
                title: "Public Chargers", 
                description: "High-speed chargers for public spaces." 
              },
              { 
                icon: <FaBolt className="w-12 h-12" />,
                title: "Portable Chargers", 
                description: "On-the-go charging solutions for EVs." 
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: index % 2 === 0 ? -2 : 2
                }}
                className="p-8 bg-white rounded-3xl shadow-2xl cursor-pointer border-2 border-[#8EB03E]/20 hover:border-[#8EB03E]/40 transition-all"
              >
                <motion.div 
                  className="text-[#8EB03E] mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {product.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
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
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#8EB03E] to-[#A0C04A] bg-clip-text text-transparent"
          >
            What Our Customers Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                name: "David Hamar", 
                review: "Amazing service and fast charging stations!", 
                rating: 5 
              },
              { 
                name: "Dimantcos", 
                review: "Eco-friendly and reliable. Highly recommend!", 
                rating: 5 
              },
              { 
                name: "Messi baoli", 
                review: "Great experience with their portable chargers.", 
                rating: 4 
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-8 bg-gradient-to-b from-[#8EB03E]/10 to-white rounded-3xl shadow-2xl border-2 border-[#8EB03E]/20"
              >
                <div className="text-[#8EB03E] mb-4">
                  <FaQuoteLeft className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaStar className="w-6 h-6 text-[#8EB03E] mx-1" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-lg font-bold text-[#8EB03E]">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#8EB03E] to-[#6E8E38]">
        <div className="container mx-auto text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block mb-12"
          >
            <FaBolt className="text-6xl text-white animate-pulse" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-white"
          >
            Ready to Power Your Future?
          </motion.h2>
          
          <motion.button
            whileHover={{ 
              scale: 1.1,
              rotate: 2,
              boxShadow: "0 0 25px rgba(255,255,255,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#8EB03E] px-12 py-5 rounded-full shadow-2xl transition-all text-xl font-bold flex items-center gap-3 mx-auto"
          >
            <FaBolt className="text-xl" />
            Get Started Now
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
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#8EB03E] to-[#A0C04A] bg-clip-text text-transparent"
          >
            About Us
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border-2 border-[#8EB03E]/20"
          >
            <p className="mb-6">
              We are pioneers in EV charging technology, committed to creating a sustainable future through innovative solutions.
            </p>
            <div className="flex justify-center gap-4">
              <FaLeaf className="text-[#8EB03E] text-3xl" />
              <FaBolt className="text-[#8EB03E] text-3xl" />
              <FaChargingStation className="text-[#8EB03E] text-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#8EB03E] to-[#A0C04A] bg-clip-text text-transparent"
          >
            Contact Us
          </motion.h2>
          
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-lg mx-auto space-y-6 bg-[#8EB03E]/10 p-8 rounded-3xl shadow-2xl border-2 border-[#8EB03E]/20"
          >
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl border-2 border-[#8EB03E]/20 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E]/20 outline-none transition-colors"
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl border-2 border-[#8EB03E]/20 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E]/20 outline-none transition-colors"
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <textarea
                placeholder="Your Message"
                className="w-full p-4 rounded-xl border-2 border-[#8EB03E]/20 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E]/20 outline-none transition-colors h-32"
              />
            </motion.div>
            
            <motion.button
              type="submit"
              whileHover={{ 
                scale: 1.05,
                rotate: 1,
                boxShadow: "0 0 20px rgba(142, 176, 62, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#8EB03E] hover:bg-[#6E8E38] text-white px-12 py-4 rounded-xl transition-all text-lg font-bold w-full"
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