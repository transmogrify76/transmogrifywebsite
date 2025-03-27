import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaArrowUp } from 'react-icons/fa';

const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { scrollY } = useScroll();

  // Image carousel state
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const images = [
    '/src/assets/images/help-1.jpg',
    '/src/assets/images/help-2.jpg',
    '/src/assets/images/help-3.jpg'
  ];

  // Help tabs data
  const helpTabs = [
    {
      title: "Expertise",
      description: "Expert advice tailored to your needs",
      detail: "Our team will assess your requirements and recommend the best EV charging solution for your property or business."
    },
    {
      title: "Guidance",
      description: "Professional installation services",
      detail: "We handle the entire installation process from start to finish, ensuring minimal disruption and maximum quality."
    },
    {
      title: "Support",
      description: "Ongoing support and care",
      detail: "Our maintenance packages keep your charging infrastructure running smoothly with regular check-ups and rapid response to any issues."
    }
  ];

  // Products data
  const products = [
    {
      name: "Home Charger Pro",
      power: "7.4kW - 22kW",
      image: "/src/assets/images/charger-1.jpg"
    },
    {
      name: "Commercial Fast Charger",
      power: "50kW - 150kW",
      image: "/src/assets/images/charger-2.jpg"
    },
    {
      name: "Ultra-Fast Charger",
      power: "150kW - 350kW",
      image: "/src/assets/images/charger-3.jpg"
    },
    {
      name: "Wallbox Standard",
      power: "3.7kW - 7.4kW",
      image: "/src/assets/images/charger-4.jpg"
    },
    {
      name: "Smart Charger",
      power: "7.4kW - 11kW",
      image: "/src/assets/images/charger-5.jpg"
    }
  ];

  // Partners data
  const partners = [
    {
      name: "ChargePoint",
      image: "/src/assets/logos/chargepoint.png",
      photo: "/src/assets/images/partner-1.jpg"
    },
    {
      name: "EVBox",
      image: "/src/assets/logos/evbox.png",
      photo: "/src/assets/images/partner-2.jpg"
    },
    {
      name: "ABB",
      image: "/src/assets/logos/abb.png",
      photo: "/src/assets/images/partner-3.jpg"
    }
  ];

  // Carousel navigation
  const [carouselPosition, setCarouselPosition] = useState(0);
  const moveCarousel = (direction: 'left' | 'right') => {
    if (direction === 'left' && carouselPosition > 0) {
      setCarouselPosition(carouselPosition - 1);
    } else if (direction === 'right' && carouselPosition < products.length - 3) {
      setCarouselPosition(carouselPosition + 1);
    }
  };

  // Active help tab state
  const [activeHelpTab, setActiveHelpTab] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  // Carousel auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-aeonik-regular">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled || isHovered ? 'bg-white shadow-md' : 'bg-transparent'
          } h-24`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-20 top-1/2 -translate-y-1/2 p-3">
            <img
              src="/src/assets/images/logo-160x57-removebg-preview.png"
              alt="Energy Park Logo"
              className="h-16 w-auto"
            />
          </div>

          <div className="absolute left-[320px] top-1/2 -translate-y-1/2 flex space-x-12">
            <button className={`text-2xl font-aeonik-medium ${isScrolled || isHovered ? 'text-gray-800' : 'text-white'}`}>
              Solutions
            </button>
            <button className={`text-2xl font-aeonik-medium ${isScrolled || isHovered ? 'text-gray-800' : 'text-white'}`}>
              About Us
            </button>
            <button className={`text-2xl font-aeonik-medium ${isScrolled || isHovered ? 'text-gray-800' : 'text-white'}`}>
              News
            </button>
          </div>

          <div className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center space-x-12">
            <button className={`text-2xl font-aeonik-medium ${isScrolled || isHovered ? 'text-gray-800' : 'text-white'}`}>
              Log In
            </button>
            <button className={`${isScrolled || isHovered ? 'bg-[#8EB03E] text-white' : 'bg-white text-[#8EB03E]'} px-8 py-3 rounded-full text-2xl font-aeonik-medium`}>
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="relative h-screen overflow-hidden"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src="/src/assets/videos/video7.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="text-white max-w-[1200px] px-8 md:px-16 lg:px-24">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-aeonik-medium tracking-wider mb-8 text-[80px] leading-tight md:text-[120px] md:leading-[1.1]"
            >
              Get set for an
              <br />
              <span className="text-[#8EB03E]">electric future</span>
            </motion.h1>

            <motion.button
              initial={{ backgroundColor: '#FFFFFF', color: '#000000' }}
              whileHover={{
                backgroundColor: '#8EB03E',
                color: '#FFFFFF',
                transition: { duration: 0.5 },
              }}
              className="flex items-center gap-35 px-10 py-8 rounded-full text-xl bg-white text-black mb-18 transition-colors"
            >
              Our solutions
              <motion.span
                initial={{ backgroundColor: '#8EB03E' }}
                whileHover={{
                  backgroundColor: '#8EB03E',
                  transition: { duration: 0.5 },
                }}
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center"
              >
                <FaArrowRight className="text-[32px] text-white" />
              </motion.span>
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-aeonik-regular text-[36px] md:text-[48px] leading-snug max-w-[800px]"
            >
              Powering peace of mind through tailored EV charging solutions
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Two-Column Section */}
      <section className="py-24 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 w-full">
              <h2 className="text-[64px] leading-[72px] font-aeonik-medium mb-16">
                Future-proof your residential
                <br />
                site or business with our
                <br />
                scalable EV charging solutions.
              </h2>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative h-96 overflow-hidden rounded-xl shadow-xl">
                <img
                  src="/src/assets/images/home-charger.jpg"
                  alt="Apartment charging solution"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-left text-gray-600 mb-12 text-[28px] font-aeonik-regular">
              Charging solutions for
            </p>
            {[
              { number: '01', title: 'Apartment buildings' },
              { number: '02', title: 'Holiday parks' },
              { number: '03', title: 'Hotels' },
              { number: '04', title: 'Workplaces' },
            ].map((item) => (
              <div
                key={item.number}
                className="relative group grid grid-cols-3 items-center w-full py-12 px-8 mb-4 overflow-hidden cursor-pointer border-b border-black/10"
              >
                <div className="absolute inset-0 bg-[#8EB03E] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                <div className="relative z-10 col-span-1 text-left">
                  <span className="text-[48px] font-aeonik-medium text-black group-hover:text-white">
                    {item.number}
                  </span>
                </div>
                <div className="relative z-10 col-span-1 flex justify-center">
                  <span className="text-[40px] font-aeonik-medium text-black group-hover:text-white text-center">
                    {item.title}
                  </span>
                </div>
                <div className="relative z-10 col-span-1 flex justify-end">
                  <FaArrowRight className="text-black text-2xl mr-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Can Help Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
  <div className="flex flex-col lg:flex-row">
    {/* Image on the left - with right padding */}
    <div className="lg:w-1/2 h-[700px] relative order-1 lg:order-1 lg:-ml-8 lg:pr-16"> {/* Added lg:pr-16 for right padding */}
      <AnimatePresence mode="wait">
        <motion.img
          key={activeHelpTab}
          src={images[activeHelpTab]}
          alt={helpTabs[activeHelpTab].title}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>

    {/* Text content on the right - only heading aligned with image top */}
    <div className="lg:w-1/2 p-8 md:p-16 flex flex-col order-2 lg:order-2">
      <div className="lg:relative">
        <h2 className="text-1xl md:text-2xl mb-12 font-aeonik-medium lg:absolute lg:-top-16">How we can help</h2>
      </div>
      
      <div className="flex-1 lg:mt-24">
        {helpTabs.map((tab, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setActiveHelpTab(index)}
            className="relative pb-8 mb-8 cursor-pointer"
          >
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-aeonik-medium mb-4">
              {tab.title}
            </h3>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-black origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeHelpTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-auto"
        >
          <h4 className="text-xl md:text-2xl font-aeonik-medium mb-4">
            {helpTabs[activeHelpTab].description}
          </h4>
          <p className="text-gray-600">
            {helpTabs[activeHelpTab].detail}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</section>
      {/* Products Section */}
      <section className="py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:w-1/3 mb-8 md:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-aeonik-medium">
              We offer a range of charge points to choose from.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="md:w-1/3"
          >
            <p className="text-gray-600">
              Select from our curated range of high-quality EV chargers from leading manufacturers.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div 
            className="flex gap-8"
            drag="x"
            dragConstraints={{ right: 0, left: -(products.length * 400) + 800 }}
            style={{ x: useTransform(scrollY, [0, 1000], [0, -200]) }}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="w-80 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center p-8">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h4 className="text-xl font-aeonik-medium mt-6">{product.name}</h4>
                <p className="text-gray-600">{product.power}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-between items-center mt-12">
            <motion.button
              onClick={() => moveCarousel('left')}
              className="p-2 rounded-full border border-gray-300"
              whileHover={{ backgroundColor: '#f3f4f6' }}
              disabled={carouselPosition === 0}
            >
              <FaArrowLeft />
            </motion.button>
            
            <div className="flex gap-2">
              {products.slice(0, products.length - 2).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === carouselPosition ? 'bg-black' : 'bg-gray-300'}`}
                  onClick={() => setCarouselPosition(index)}
                />
              ))}
            </div>
            
            <motion.button
              onClick={() => moveCarousel('right')}
              className="p-2 rounded-full border border-gray-300"
              whileHover={{ backgroundColor: '#f3f4f6' }}
              disabled={carouselPosition === products.length - 3}
            >
              <FaArrowRight />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:w-1/3 mb-8 md:mb-0"
          >
            <h3 className="text-xl md:text-2xl font-aeonik-medium">
              We partner with the best.
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-aeonik-medium">
              Working with leading equipment manufacturers gives us access to a wide range of hardware solutions.
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden h-96"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={partner.photo}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg w-48 h-24 flex items-center justify-center">
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-16 lg:px-24 relative rounded-3xl overflow-hidden my-24 mx-6 bg-gradient-to-r from-[#8EB03E] to-[#6A8F28]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 text-white text-center"
        >
          <h2 className="text-4xl md:text-6xl font-aeonik-medium mb-8">
            Ready to get started?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            EV charging solutions for residential sites and businesses.
          </p>
          <motion.button
            className="px-8 py-4 bg-white text-black rounded-full text-xl font-aeonik-medium flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact us
            <motion.div
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
              whileHover={{ rotate: 45 }}
            >
              <FaArrowRight />
            </motion.div>
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-6 md:px-16 lg:px-24 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src="/src/assets/images/logo-160x57-removebg-preview.png" alt="Energy Park" className="h-12 mb-6" />
            <p className="text-gray-600 mb-6">
              Experts in smart EV charging solutions for residential sites and businesses.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-full flex items-center gap-2">
              Client portal
              <div className="w-6 h-6 rounded-full bg-[#8EB03E] flex items-center justify-center">
                <FaArrowRight className="text-white" />
              </div>
            </button>
          </div>

          <div>
            <h4 className="text-lg font-aeonik-medium mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="/solutions" className="text-gray-600 hover:text-black">Solutions</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-black">About Us</a></li>
              <li><a href="/news" className="text-gray-600 hover:text-black">News</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-black">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-aeonik-medium mb-6">Follow us</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-black">LinkedIn</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-aeonik-medium mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-black">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Modern Slavery Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">ESG Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">Copyright © Energy Park {new Date().getFullYear()}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-black">Site by Outpost</a>
            <button className="flex items-center gap-2 text-gray-600 hover:text-black">
              Back to top
              <FaArrowUp />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;