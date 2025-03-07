import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-8"
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl"
        >
          We are a leading provider of EV charging solutions, dedicated to making electric vehicle charging accessible and efficient.
        </motion.p>
      </div>
    </section>
  );
};

export default About;