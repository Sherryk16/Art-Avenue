'use client';

import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export default function FullBrandingPackagesService() {
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
              <span className="text-gold">Full Branding Packages</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete branding solutions for a cohesive stream identity that resonates with your audience.
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
                Complete Brand Identity
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                A full branding package ensures all elements of your online presence work together 
                cohesively. From your logo to your overlays, every visual element reinforces your 
                unique identity and creates a memorable experience for your audience.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our comprehensive branding packages are designed to establish a strong, consistent 
                visual identity across all platforms, helping you stand out in a crowded streaming landscape.
              </p>
              
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gold">What You&apos;ll Get</h3>
                <ul className="space-y-3">
                  {[
                    'Complete logo design package',
                    'Custom overlays and banners',
                    'Animated alerts and notifications',
                    'Social media branding kit',
                    'Brand guidelines document'
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
                  <h3 className="text-xl font-bold text-gold mb-2">Starter Package</h3>
                  <p className="text-gray-300 mb-3">Perfect for new streamers</p>
                  <ul className="space-y-2 mb-4">
                    {['Logo design', 'Basic overlay', 'Channel banner', 'Brand guidelines'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-[#d4af37] mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-b border-gray-700 pb-6">
                  <h3 className="text-xl font-bold text-gold mb-2">Growth Package</h3>
                  <p className="text-gray-300 mb-3">Most popular choice</p>
                  <ul className="space-y-2 mb-4">
                    {['Logo + variations', 'Multiple overlays', 'Social media kit', 'Animated alerts', 'Brand guidelines'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-[#d4af37] mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gold mb-2">Premium Package</h3>
                  <p className="text-gray-300 mb-3">Complete brand solution</p>
                  <ul className="space-y-2 mb-4">
                    {['Full logo suite', 'Complete overlay set', 'Full social media kit', 'Advanced alerts', '2D model option', 'Extended license'].map((item, index) => (
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
                { step: '01', title: 'Consultation', desc: 'We discuss your brand vision and goals' },
                { step: '02', title: 'Strategy', desc: 'We develop your brand identity concept' },
                { step: '03', title: 'Design', desc: 'We create all brand elements' },
                { step: '04', title: 'Delivery', desc: 'We provide complete brand kit' }
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
              Ready for Complete Branding?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s create a cohesive brand identity that makes you stand out.
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