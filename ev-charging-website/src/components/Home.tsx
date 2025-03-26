import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

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
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled || isHovered ? 'bg-white shadow-md' : 'bg-transparent'
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
              whileHover={{ scale: 1.05, backgroundColor: '#8EB03E', color: '#FFFFFF' }}
              className="flex items-center gap-3 px-10 py-5 border-2 border-[#8EB03E] rounded-full text-[32px] font-aeonik-medium bg-white text-black mb-8 transition-colors"
            >
              Our solutions
              <motion.span
                initial={{ backgroundColor: 'transparent', borderColor: '#8EB03E' }}
                whileHover={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }}
                className="w-[50px] h-[50px] rounded-full border-2 flex items-center justify-center"
              >
                <FaArrowRight className="text-[32px] text-[#8EB03E]" />
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
<section className="relative h-screen w-full">
  <div className="h-full w-full flex">
    {/* Image Column - Left */}
    <div className="w-[45%] h-full pl-14">
      <div className="relative h-full w-full">
        {images.map((img, index) => (
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full overflow-hidden rounded-[40px]"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: activeImageIndex === index ? 1 : 0,
            }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={img}
              alt={`Help example ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>

    {/* Text Column - Right */}
    <div className="w-[55%] h-full flex flex-col items-start pl-24 pr-0 py-16">
      {/* Heading */}
      <h2 className="text-[28px] font-aeonik-medium mb-12 ml-[8%]">
        How we can help
      </h2>

      {/* Options with Meter Line Animation */}
      <div className="space-y-12 mb-16 ml-[8%] w-[80%]">
        {['Expertise', 'Guidance', 'Support'].map((item, index) => (
          <div 
            key={item}
            className="relative"
            onMouseEnter={() => setActiveImageIndex(index)}
          >
            <h1 className="text-[72px] font-aeonik-bold leading-[1.1] relative inline-block cursor-pointer">
              {item}
              <motion.div
                className="absolute bottom-0 left-0 h-[4px] bg-[#8EB03E]"
                initial={{ width: 0 }}
                whileHover={{
                  width: "100%",
                  transition: { 
                    duration: 0.6, 
                    ease: "easeInOut" 
                  }
                }}
              />
            </h1>
          </div>
        ))}
      </div>

      {/* Text Blocks */}
      <div className="space-y-8 mt-auto ml-[8%] w-[80%]">
        <div className="text-[20px] leading-relaxed">
          <p className="font-aeonik-medium text-[22px] mb-3">Ongoing management and maintenance</p>
          <p>We can take care of all ongoing operations, including maintenance and customer service, so there's no need for your day-to-day involvement.</p>
        </div>
        <div className="text-[20px] leading-relaxed">
          <p className="font-aeonik-medium text-[22px] mb-3">Leaders in residential EV charging solutions</p>
          <p>Backed by the UK Government's Charging Infrastructure Investment Fund (CIIF), Energy Park brings you a team of highly trained professionals.</p>
        </div>
        <div className="text-[20px] leading-relaxed">
          <p className="font-aeonik-medium text-[22px] mb-3">A consultative approach</p>
          <p>We work closely with you throughout the design and installation process to ensure the infrastructure meets your unique requirements.</p>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;