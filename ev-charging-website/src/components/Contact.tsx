import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactno, setContactno] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      email,
      contactno,
      message,
    };

    try {
      const response = await fetch('http://localhost:8000/contact/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save contact');
      }
      toast.success('Contact has been saved successfully');
      // Clear form fields on success
      setName('');
      setEmail('');
      setContactno('');
      setMessage('');
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-40 bg-gray-50">
      <ToastContainer />
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
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
              required
            />
            <input
              type="text"
              placeholder="Your Contact Number"
              value={contactno}
              onChange={(e) => setContactno(e.target.value)}
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 mb-4 rounded border border-gray-300 focus:border-[#8EB03E] focus:ring-2 focus:ring-[#8EB03E] outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-full transition-all"
            >
              {loading ? 'Sending...' : 'Send Message'}
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
              src="https://www.google.com/maps?q=10ES06,+Mani+Casadona+11F/04,+Street+No.+372,+Action+Area+–+IIF,+Newtown,+Rajarhat,+Kolkata+–+700156,+West+Bengal+IN&output=embed"
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
