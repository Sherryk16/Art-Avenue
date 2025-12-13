'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const services = [
  {
    title: 'Logo Design',
    description: 'Unique, memorable logos that represent your brand identity.',
  },
  {
    title: 'Twitch/YouTube Overlays',
    description: 'Professional overlays that enhance your stream\'s visual appeal.',
  },
  {
    title: 'Stream Banners',
    description: 'Eye catching banners for your channel and social media.',
  },
  {
    title: 'Animated Alerts',
    description: 'Dynamic alerts that celebrate viewer interactions.',
  },
  {
    title: '2D Models',
    description: 'Custom 2D character models for your streaming persona.',
  },
  {
    title: '3D VTuber Models',
    description: 'High quality 3D models that bring your avatar to life.',
  },
  {
    title: 'Full Branding Packages',
    description: 'Complete branding solutions for a cohesive stream identity.',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="services" className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            <span className="text-gold">Our Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive design services to elevate your streaming brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="premium-card p-8 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className="text-2xl font-bold mb-3 text-gold">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{service.description}</p>
              <div className="h-1 w-20 bg-gradient-to-r from-[#d4af37] to-[#f4e4bc] rounded-full group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/services">
            <motion.button
              className="premium-btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

