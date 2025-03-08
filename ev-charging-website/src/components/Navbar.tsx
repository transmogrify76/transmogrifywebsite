import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/images/transmogrify logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white p-4 fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      
        <Link to="/">
          <img
            src={logo}
            alt="EV Charge Co. Logo"
            className="h-18 w-30 object-contain" 
          />
        </Link>
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FaTimes className="text-gray-900 w-6 h-6" /> 
          ) : (
            <FaBars className="text-gray-900 w-6 h-6" /> 
          )}
        </div>
        <ul
          className={`md:flex ${isOpen ? 'block' : 'hidden'} space-x-6 text-gray-900`}
        >
          <li>
            <Link to="/" className="hover:text-[#8EB03E] transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-[#8EB03E] transition-all">
              Services
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-[#8EB03E] transition-all">
              Products
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-[#8EB03E] transition-all">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#8EB03E] transition-all">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;