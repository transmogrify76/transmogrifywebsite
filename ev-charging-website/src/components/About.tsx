import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';

const About = () => {
  const team = [
    {
      icon: <FaUsers className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
      title: "Our Team",
      description: "A dedicated team of experts in EV technology.",
    },
    {
      icon: <FaLightbulb className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
      title: "Our Mission",
      description: "To make EV charging accessible and efficient for everyone.",
    },
    {
      icon: <FaHandshake className="w-12 h-12 mb-4" style={{ color: '#8EB03E' }} />,
      title: "Our Values",
      description: "Sustainability, innovation, and customer satisfaction.",
    },
  ];

  return (
    <section className="py-40 bg-white">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-8"
          style={{ color: '#8EB03E' }}
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl text-gray-700 max-w-2xl mx-auto mb-12"
        >
          We are a leading provider of EV charging solutions, dedicated to making electric vehicle charging accessible and efficient.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-gray-50 rounded-lg shadow-lg cursor-pointer border border-gray-200 hover:border-[#8EB03E] transition-all"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mb-2" style={{ color: '#8EB03E' }}>{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;