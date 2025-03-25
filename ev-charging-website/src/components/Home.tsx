import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <div className="min-h-screen font-montserrat">
      {/* Navigation Bar - Taller height */}
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} h-24`}>
        <div className="relative w-full h-full">
          {/* Logo Container - Larger size */}
          <div className={`absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-lg ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
            <img 
              src="\src\assets\images\transmogrify logo.jpg" 
              alt="Energy Park Logo"
              className="h-18 w-auto" 
            />
          </div>
          
          {/* Main Nav Items - Absolute Left */}
          <div className="absolute left-60 top-1/2 -translate-y-1/2 flex space-x-12">
            <button className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Solutions</button>
            <button className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>About Us</button>
            <button className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>News</button>
          </div>
          
          {/* Right-side Items - Absolute Right */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center space-x-12">
            <div className="w-px h-10 bg-gray-400"></div>
            <button className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Log In</button>
            <button className={`${
              isScrolled ? 'bg-[#8EB03E] text-white' : 'bg-white text-[#8EB03E]'
            } px-10 py-4 rounded-full text-2xl font-bold`}>
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Video Hero Section - Updated Left Aligned */}
      <motion.section 
        className="relative h-screen overflow-hidden"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="\src\assets\videos\video1.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-start justify-start">
          <div className="text-white pl-8 md:pl-16 lg:pl-40 pt-50">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[48px] leading-[56px] md:text-[64px] md:leading-[72px] lg:text-[72px] lg:leading-[80px] font-bold mb-8 text-left max-w-3xl"
            >
              Get set for an<br />
              <span className="text-[#8EB03E]">electric future</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-left"
            >
              <p className="text-[540px] leading-[320px] md:text-[28px] md:leading-[36px] mb-10 font-medium max-w-2xl">
                Our solutions
                <br />
                Powering peace of mind
                <br />
                through tailored EV charging
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#8EB03E] text-white px-12 py-5 rounded-full flex items-center gap-3 text-xl font-semibold"
              >
                Our solutions <FaArrowRight className="mt-0.5 text-2xl" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solutions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-[32px] leading-[40px] font-bold text-center mb-16">
            Future-proof your residential
            <br />
            site or business with our
            <br />
            scalable EV charging solutions.
          </h2>

          <div className="mt-8">
            <p className="text-center text-gray-600 mb-12 text-[18px]">Charging solutions for</p>
            
            <div className="space-y-8">
              {/* Apartment Buildings */}
              <div className="flex justify-between items-center py-5 border-b border-[#8EB03E]/30">
                <div className="flex items-center gap-6">
                  <span className="text-[28px] font-bold text-[#8EB03E]">01</span>
                  <span className="text-[24px]">Apartment buildings</span>
                </div>
                <FaArrowRight className="text-[#8EB03E] text-xl" />
              </div>

              {/* Holiday Parks */}
              <div className="flex justify-between items-center py-5 border-b border-[#8EB03E]/30">
                <div className="flex items-center gap-6">
                  <span className="text-[28px] font-bold text-[#8EB03E]">02</span>
                  <span className="text-[24px]">Holiday parks</span>
                </div>
                <FaArrowRight className="text-[#8EB03E] text-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Can Help */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-[32px] leading-[40px] font-bold mb-16">How we can help</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="font-semibold text-[22px]">Expertise</h3>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-[22px]">Guidance</h3>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-[22px]">Support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Notice */}
      <div className="fixed bottom-0 w-full bg-gray-100 p-5">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="text-[16px]">This website uses cookies.</span>
          <button className="bg-[#8EB03E] text-white px-6 py-2.5 rounded-full text-[16px] font-medium">
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;