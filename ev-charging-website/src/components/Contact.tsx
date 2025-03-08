import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-8"
          style={{ color: '#8EB03E' }}
        >
          Contact Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
            />
            <button
              type="submit"
              className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-full transition-all"
            >
              Send Message
            </button>
          </motion.form>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a6c9d4a1a1!2sEV%20Charging%20Station!5e0!3m2!1sen!2sus!4v1633023222534!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;