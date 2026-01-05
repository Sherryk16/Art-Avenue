'use client';

import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export default function StreamBannersService() {
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
              <span className="text-gold">Stream Banners</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Eye-catching banners for your channel and social media that attract viewers and subscribers.
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
                Make Your Channel Stand Out
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your banner is often the first visual element new visitors see on your channel. A well-designed banner 
                creates a strong first impression and communicates your brand identity effectively.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Whether you&apos;re creating a Twitch channel banner, YouTube banner, or social media header,
                our designs are crafted to be visually appealing while maintaining readability across all devices.
              </p>
              
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gold">What You&apos;ll Get</h3>
                <ul className="space-y-3">
                  {[
                    'Multiple banner sizes for different platforms',
                    'Social media ready dimensions',
                    'High resolution files',
                    'Quick delivery',
                    'Unlimited revisions until satisfied'
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
                  <p className="text-gray-300 mb-3">Perfect for starting streamers</p>
                  <ul className="space-y-2 mb-4">
                    {['1 banner design', 'Standard dimensions', 'JPG & PNG formats', '1 round of revisions'].map((item, index) => (
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
                    {['Multiple banner sizes', 'Animated banner option', 'All social media formats', 'Unlimited revisions', 'Brand guidelines'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-[#d4af37] mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gold mb-2">Premium Package</h3>
                  <p className="text-gray-300 mb-3">Complete social media kit</p>
                  <ul className="space-y-2 mb-4">
                    {['Full social media banner set', 'Multiple design concepts', 'Animated and static options', 'Social media templates', 'Priority support'].map((item, index) => (
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
                { step: '01', title: 'Consultation', desc: 'We discuss your brand and channel goals' },
                { step: '02', title: 'Design', desc: 'We create banner concepts based on your style' },
                { step: '03', title: 'Revisions', desc: 'We refine based on your feedback' },
                { step: '04', title: 'Delivery', desc: 'We provide all formats and sizes' }
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
              Ready to Transform Your Channel?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s create banners that make your channel stand out and attract more viewers.
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