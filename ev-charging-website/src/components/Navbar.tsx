import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/images/transmogrify logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
  ];

  const rightLinks = [
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <nav className="bg-white p-4 fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <motion.img
            src={logo}
            alt="EV Charge Co. Logo"
            className="h-18 w-30 object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex space-x-6 text-gray-900">
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to={link.path}
                  className="hover:text-[#8EB03E] transition-all font-medium"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="h-6 w-px bg-gray-300 mx-4" />

          <ul className="flex space-x-6 items-center">
            {rightLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`${
                    link.name === 'Login'
                      ? 'bg-gradient-to-r from-[#8EB03E] to-[#6A8F2E] text-white px-6 py-2 rounded-full hover:shadow-lg'
                      : 'hover:text-[#8EB03E]'
                  } transition-all font-medium`}
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <motion.div
          className="md:hidden z-50"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <FaTimes className="text-gray-900 w-6 h-6" />
          ) : (
            <FaBars className="text-gray-900 w-6 h-6" />
          )}
        </motion.div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center pt-20 space-y-8"
          >
            {[...navLinks, ...rightLinks].map((link) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring' }}
              >
                <Link
                  to={link.path}
                  className={`text-2xl ${
                    link.name === 'Login'
                      ? 'bg-gradient-to-r from-[#8EB03E] to-[#6A8F2E] text-white px-8 py-3 rounded-full'
                      : 'text-gray-900 hover:text-[#8EB03E]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;