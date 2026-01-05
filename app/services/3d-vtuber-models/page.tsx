'use client';

import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export default function ThreeDVTuberModelsService() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="text-gold">3D VTuber Models</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              High-quality 3D models that bring your avatar to life with stunning detail and smooth animations.
            </p>
          </motion.div>

          {/* Service Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Next-Level VTubing
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                3D VTuber models offer the most immersive and realistic avatar experience. With detailed 
                textures, realistic movements, and smooth animations, these models create a truly engaging 
                presence that captivates your audience.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our 3D models are created with the highest attention to detail and optimized for 
                real-time performance, ensuring smooth streaming without impacting your gameplay.
              </p>
              
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gold">What You'll Get</h3>
                <ul className="space-y-3">
                  {[
                    'Full 3D model with detailed textures',
                    'Complete rigging and animation setup',
                    'VRM format for compatibility',
                    'Customization options',
                    'Setup guide and support'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#d4af37] mr-3 mt-1">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="premium-card p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Service Package
              </h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-700 pb-6">
                  <h3 className="text-xl font-bold text-gold mb-2">Basic Package</h3>
                  <p className="text-gray-300 mb-3">Perfect for starting VTubers</p>
                  <ul className="space-y-2 mb-4">
                    {['Basic 3D model', 'Essential rigging', 'VRM format', 'Setup guide'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-[#d4af37] mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-b border-gray-700 pb-6">
                  <h3 className="text-xl font-bold text-gold mb-2">Standard Package</h3>
                  <p className="text-gray-300 mb-3">Most popular choice</p>
                  <ul className="space-y-2 mb-4">
                    {['Detailed 3D model', 'Advanced rigging', 'Multiple expressions', 'Physics simulation', 'Priority support'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-[#d4af37] mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gold mb-2">Premium Package</h3>
                  <p className="text-gray-300 mb-3">Complete VTuber solution</p>
                  <ul className="space-y-2 mb-4">
                    {['Highly detailed 3D model', 'Full rigging and animation', 'Advanced physics', 'Custom clothing options', 'Extended support'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-[#d4af37] mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="premium-card p-8 mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Design Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Consultation', desc: 'We discuss your VTuber persona and style' },
                { step: '02', title: 'Concept', desc: 'We create initial character concepts' },
                { step: '03', title: '3D Modeling', desc: 'We create the detailed 3D model' },
                { step: '04', title: 'Delivery', desc: 'We provide the model with setup guide' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-[#d4af37] mb-3">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2 text-gold">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Ready for Next-Level VTubing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s create a 3D model that brings your avatar to life with stunning detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="premium-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <motion.button
                  className="premium-btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}