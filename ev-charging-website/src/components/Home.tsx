import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowUp } from 'react-icons/fa';


const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { scrollY } = useScroll();

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
      image: "/src/assets/images/Charger1.png"
    },
    {
      name: "Commercial Fast Charger",
      power: "50kW - 150kW",
      image: "/src/assets/images/Charger2.png"
    },
    {
      name: "Ultra-Fast Charger",
      power: "150kW - 350kW",
      image: "/src/assets/images/Charger3.png"
    },
    {
      name: "Wallbox Standard",
      power: "3.7kW - 7.4kW",
      image: "/src/assets/images/Charger4.png"
    },
    {
      name: "Smart Charger",
      power: "7.4kW - 11kW",
      image: "/src/assets/images/Charger5.png"
    }
  ];

 
  const partners = [
    {
      name: "ChargePoint",
      image: "\src\assets\images\eo2.jpg",
      photo: "\src\assets\images\eo1.jpg"
    },
    {
      name: "EVBox",
      image: "\src\assets\images\zaptac2.png",
      photo: "\src\assets\images\zaptac1.jpg"
    },
    {
      name: "ABB",
      image: "/src/assets/logos/abb.png",
      photo: "/src/assets/images/partner-3.jpg"
    },
    {
      name: "ChargePoint",
      image: "/src/assets/logos/chargepoint.png",
      photo: "/src/assets/images/partner-4.jpg"
    },
    {
      name: "EVBox",
      image: "/src/assets/logos/evbox.png",
      photo: "/src/assets/images/partner-5.jpg"
    },
    {
      name: "ABB",
      image: "/src/assets/logos/abb.png",
      photo: "/src/assets/images/partner-6.jpg"
    }
  ];
   
  const cardTotalWidth = 620; 
  // Active help tab state
  const [activeHelpTab, setActiveHelpTab] = useState(0);

  // Images for the "How we can help" section
  const images = [
    '/src/assets/images/help-7.jpg',
    '/src/assets/images/help-6.jpg',
    '/src/assets/images/help-5.jpg'
  ];

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);
  return (
    // Base font set to Aeonik Regular
    <div className="min-h-screen font-aeonik-regular">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled || isHovered ? 'bg-white shadow-md' : 'bg-transparent'} h-24`}
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
              className="flex items-center gap-35 px-10 py-8 rounded-full text-xl bg-white text-black mb-18 transition-colors font-aeonik-medium"
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
              className="text-[36px] md:text-[48px] leading-snug max-w-[800px]"
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
                  src="/src/assets/images/thumb-man.png"
                  alt="Apartment charging solution"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-left text-black-600 mb-12 text-[20px]">
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
                  <span className="text-[68px] font-aeonik-medium text-black group-hover:text-white">
                    {item.number}
                  </span>
                </div>
                <div className="relative z-10 col-span-1 flex justify-center">
                  <span className="text-[60px] font-aeonik-medium text-black group-hover:text-white text-center">
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
          {/* Image on the left */}
          <div className="lg:w-1/2 h-[700px] relative order-1 lg:order-1 lg:-ml-8 lg:pr-16">
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

          {/* Text content on the right */}
          <div className="lg:w-1/2 p-8 md:p-16 flex flex-col order-2 lg:order-2">
            <div className="lg:relative">
              <h2 className="text-xl md:text-2xl mb-12 font-aeonik-medium lg:absolute lg:-top-16">
                How we can help
              </h2>
            </div>
            
            <div className="flex-1 lg:mt-24">
              {helpTabs.map((tab, index) => (
                <motion.div
                  key={index}
                  onHoverStart={() => setActiveHelpTab(index)}
                  className="relative pb-8 mb-8 cursor-pointer group"
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-aeonik-medium mb-4 relative inline-block">
                    {tab.title}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </h3>
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

      {/* Parallax Image Section */}
      <section className="relative h-[120vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{
            y: useTransform(scrollY, [0, 1000], [0, -200]),
            scale: useTransform(scrollY, [0, 1000], [1, 1.1])
          }}
        >
          <img 
            src="/src/assets/images/residental-hero-copy.jpg" 
            alt="EV Charging Solutions"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/40 flex items-end pb-0 pl-8 md:pl-16 lg:pl-24 pr-8 md:pr-16 lg:pr-20">
          <div className="relative z-10 w-full flex justify-between items-end">
            {/* Text section - Bottom Left */}
            <motion.div 
              className="text-white"
              style={{
                y: useTransform(scrollY, [0, 1000], [0, -100])
              }}
            >
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-7xl font-aeonik-medium leading-[0.9]"
              >
                Smart EV charging solutions<br />
                for residential sites and businesses
              </motion.h2>
            </motion.div>

            {/* Button - Bottom Right */}
            <motion.div
              className="relative"
              style={{
                y: useTransform(scrollY, [0, 1000], [0, -50])
              }}
            >
              <motion.button
                initial={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                whileHover={{
                  backgroundColor: '#8EB03E',
                  color: '#FFFFFF',
                  transition: { duration: 0.4 }
                }}
                className="px-16 py-6 rounded-full flex items-center gap-16 text-2xl font-aeonik-medium"
              >
                Our Solutions
                <motion.span
                  className="w-15 h-15 rounded-full bg-[#8EB03E] flex items-center justify-center"
                  whileHover={{ rotate: 45 }}
                >
                  <FaArrowRight className="text-2xl text-white" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-0 md:px-8 lg:px-12 overflow-hidden bg-white relative">
        <div className="w-full mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 px-6 md:px-16 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              {/* Optional content */}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="md:w-1/2 text-left -ml-8"
            >
              <h2 className="text-7xl md:text-6xl font-aeonik-regular">
                We offer a range of <br /> charge points to choose from.
              </h2>
            </motion.div>
          </div>

          <div className="relative w-full">
            {/* Full-width carousel container */}
            <div className="overflow-hidden w-full py-8">
              <motion.div 
                className="flex gap-10 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{
                  right: 0,
                  left: -(products.length * 500) + (typeof window !== 'undefined' ? window.innerWidth : 0)
                }}
                dragElastic={0.05}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
                style={{ width: `${products.length * 500}px` }}
              >
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    className="w-[480px] flex-shrink-0 px-4"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gray-100 rounded-2xl h-[600px] flex items-center justify-center p-10 relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="absolute h-full w-full object-contain p-12 transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/src/assets/images/placeholder-charger.png';
                        }}
                      />
                    </div>
                    <div className="mt-8 px-6">
                      <h4 className="text-3xl font-aeonik-medium">{product.name}</h4>
                      <p className="text-gray-600 text-xl mt-3">{product.power}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="relative mt-16">
              <div className="border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Partners Section */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Headings */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          {/* Small text, extreme left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="md:w-1/3 mb-10 md:mb-0 text-left"
          >
            <h3 className="text-xl md:text-2xl font-aeonik-regular text-[#8EB03E] mb-4">
              We partner with the best.
            </h3>
          </motion.div>
          {/* Big main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="md:w-2/3 text-left"
          >
            <h2 className="text-5xl md:text-6xl font-aeonik-medium leading-tight">
              Working with leading equipment manufacturers gives us access
              to a wide range of hardware solutions.
            </h2>
          </motion.div>
        </div>

        {/* Partner Logos Slider */}
        <div className="relative mt-16">
          <div className="overflow-hidden py-6">
            <motion.div
              className="flex gap-10 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{
                right: 0,
                left:
                  -(partners.length * cardTotalWidth) +
                  (typeof window !== 'undefined' ? window.innerWidth : 0),
              }}
              dragElastic={0.05}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
              style={{ width: `${partners.length * cardTotalWidth}px` }}
            >
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  className="w-[600px] flex-shrink-0 px-4"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Partner Card */}
                  <div className="relative rounded-2xl h-[400px] overflow-hidden shadow-md">
                    {/* Background partner image */}
                    <img
                      src={partner.photo}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/src/assets/images/placeholder-logo.png';
                      }}
                    />
                    {/* Overlaid brand logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="max-h-20 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/src/assets/images/placeholder-logo.png';
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg font-aeonik-regular">Drag slider</p>
          </div>
        </div>
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
            <button className="px-6 py-3 bg-black text-white rounded-full flex items-center gap-2 font-aeonik-medium">
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
            <button className="flex items-center gap-2 text-gray-600 hover:text-black font-aeonik-medium">
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
