'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: 'Premium Custom Designs',
    description: 'Every design is uniquely crafted to match your brand identity and streaming style.',
  },
  {
    title: 'Fast Delivery',
    description: 'Get your designs delivered quickly without compromising on quality or creativity.',
  },
  {
    title: 'High-Quality 2D/3D Models',
    description: 'Professional-grade models that bring your streaming persona to life.',
  },
  {
    title: 'Streamer-Focused Branding',
    description: 'Specialized in creating cohesive branding packages that resonate with your audience.',
  },
  {
    title: 'Lifetime Support',
    description: 'Ongoing support and updates to ensure your brand stays fresh and relevant.',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            <span className="text-gold">Why Choose Art Avenue</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the difference of premium design services tailored for streamers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="premium-card p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-3 text-gold">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-[#d4af37] to-[#f4e4bc] rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
