'use client';

import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export default function AnimationsService() {
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
              <span className="text-gold">Animations</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dynamic animations including intros, outros, and other animated elements to enhance your content.
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
                Bring Your Content to Life
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Animations add a professional touch to your content and help create a memorable viewing experience. 
                From eye-catching intros to smooth outros, animations make your content stand out and keep viewers engaged.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our animation services include everything from simple animated elements to complex motion graphics, 
                all tailored to match your brand identity and style preferences.
              </p>
              
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gold">What You'll Get</h3>
                <ul className="space-y-3">
                  {[
                    'Custom intro animations',
                    'Professional outro sequences',
                    'Animated elements for your content',
                    'Brand-aligned motion graphics',
                    'Multiple format options for different platforms'
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
                  <p className="text-gray-300 mb-3">Perfect for starting content creators</p>
                  <ul className="space-y-2 mb-4">
                    {['Simple intro animation', 'Basic outro', '1 revision', 'MP4 format'].map((item, index) => (
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
                    {['Animated intro', 'Custom outro', 'Animated elements', 'Multiple revisions', 'Multiple format options'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-[#d4af37] mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gold mb-2">Premium Package</h3>
                  <p className="text-gray-300 mb-3">Complete animation suite</p>
                  <ul className="space-y-2 mb-4">
                    {['Complex intro animation', 'Multiple outro options', 'Full animated element set', 'Unlimited revisions', 'Extended license'].map((item, index) => (
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
                { step: '01', title: 'Consultation', desc: 'We discuss your animation needs and style' },
                { step: '02', title: 'Concept', desc: 'We create initial animation concepts' },
                { step: '03', title: 'Animation', desc: 'We create the animations based on your brand' },
                { step: '04', title: 'Delivery', desc: 'We provide final animation files' }
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
              Ready to Animate Your Content?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s create animations that make your content stand out.
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