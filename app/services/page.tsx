'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const services = [
  {
    title: 'Logo Design',
    description: 'Create a unique, memorable logo that represents your brand identity. Perfect for streamers who want to stand out.',
    features: ['Multiple concepts', 'Unlimited revisions', 'Vector files', 'Social media variations'],
  },
  {
    title: 'Twitch/YouTube Overlays',
    description: 'Professional overlays that enhance your stream&apos;s visual appeal and create a cohesive brand experience.',
    features: ['Custom design', 'Animated elements', 'Multiple scenes', 'Easy to use'],
  },
  {
    title: 'Stream Banners',
    description: 'Eye-catching banners for your channel and social media that attract viewers and subscribers.',
    features: ['Multiple sizes', 'Social media ready', 'High resolution', 'Quick delivery'],
  },
  {
    title: 'Animated Alerts',
    description: 'Dynamic alerts that celebrate viewer interactions and make your stream more engaging.',
    features: ['Custom animations', 'Sound integration', 'Multiple alert types', 'OBS ready'],
  },
  {
    title: '2D Models',
    description: 'Custom 2D character models for your streaming persona, perfect for VTubers and content creators.',
    features: ['Full body design', 'Multiple expressions', 'Rigging included', 'Animation ready'],
  },
  {
    title: '3D VTuber Models',
    description: 'High-quality 3D models that bring your avatar to life with stunning detail and smooth animations.',
    features: ['Full 3D model', 'Rigging & animation', 'VRM format', 'Customization options'],
  },
  {
    title: 'Full Branding Packages',
    description: 'Complete branding solutions for a cohesive stream identity that resonates with your audience.',
    features: ['Logo + Overlays', 'Banners + Alerts', 'Social media kit', 'Brand guidelines'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="text-gold">Our Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Premium design services tailored for streamers. Choose from our range of services or get a custom package.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="premium-card p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <h3 className="text-2xl font-bold mb-3 text-gold">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="text-[#d4af37] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-gray-700 flex flex-col sm:flex-row gap-3">
                  <Link href={`/services/${service.title.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-')}`}>
                    <motion.button
                      className="w-full premium-btn-outline"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      className="w-full premium-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="premium-card p-12 bg-gradient-to-br from-[#d4af37] to-[#f4e4bc] text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Need a Custom Package?
            </h2>
            <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
              Let&apos;s create a custom solution tailored to your specific needs and budget.
            </p>
            <Link href="/contact">
              <motion.button
                className="premium-btn bg-gray-800 text-white hover:bg-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

