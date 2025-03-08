import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#8EB03E' }}>EV Charge Co.</h3>
            <p className="text-gray-400">
              Revolutionizing EV charging solutions for a sustainable future.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4" style={{ color: '#8EB03E' }}>Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">Contact</a></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4" style={{ color: '#8EB03E' }}>Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 rounded border border-gray-700 bg-gray-800 text-white focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
              />
              <button
                type="submit"
                className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-4 py-2 rounded-full transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4" style={{ color: '#8EB03E' }}>Follow Us</h4>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; 2023 EV Charge Co. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;