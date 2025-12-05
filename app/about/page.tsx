'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// import { User } from 'lucide-react'; // Removed as it's unused

const timeline = [
  {
    year: '2020',
    title: 'Founded',
    description: 'Art Avenue was born from a passion for helping streamers create their unique brand identity.',
  },
  {
    year: '2021',
    title: 'First 100 Clients',
    description: 'Reached our first milestone of 100 satisfied streamers with premium designs.',
  },
  {
    year: '2022',
    title: '3D Model Services',
    description: 'Expanded our services to include high-quality 3D VTuber models.',
  },
  {
    year: '2023',
    title: 'Global Recognition',
    description: 'Recognized as a leading design service provider for content creators worldwide.',
  },
  {
    year: '2024',
    title: 'Innovation Continues',
    description: 'Constantly evolving and improving to deliver the best design experience.',
  },
];

export default function AboutPage() {
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
              <span className="text-gold">About Art Avenue</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Where creativity meets excellence in design for streamers
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="premium-card p-12 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              At Art Avenue, we believe that every streamer deserves premium design services that reflect their unique personality and brand. 
              We&apos;re dedicated to creating stunning visuals that help content creators stand out in the competitive streaming landscape.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our team of talented designers combines artistic vision with technical expertise to deliver designs that not only look amazing 
              but also enhance the streaming experience for both creators and their audiences.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Journey
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d4af37] to-[#f4e4bc] transform md:-translate-x-1/2" />

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4e4bc] flex items-center justify-center text-white font-bold text-lg z-10 relative">
                    {item.year}
                  </div>
                  <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'}`}>
                    <div className="premium-card p-6 max-w-md">
                      <h3 className="text-2xl font-bold mb-2 text-gold">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Founder Section */}
          {/* Removed Founder Section */}
        </div>
      </main>
      <Footer />
    </>
  );
}

