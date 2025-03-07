import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">EV Charge Co.</div>
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
        </div>
        <ul className={`md:flex ${isOpen ? 'block' : 'hidden'} space-x-6 text-white`}>
          <li><a href="/" className="hover:text-blue-400">Home</a></li>
          <li><a href="/services" className="hover:text-blue-400">Services</a></li>
          <li><a href="/about" className="hover:text-blue-400">About</a></li>
          <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;