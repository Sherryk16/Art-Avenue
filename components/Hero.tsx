'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg3.mp4" type="video/mp4" />
      </video>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center min-h-screen pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase flex items-center justify-center gap-0"
              style={{ 
                fontFamily: 'var(--font-bodoni), serif',
                fontWeight: 700,
                fontStyle: 'normal',
                letterSpacing: '0.03em',
              }}
            >
              <span className="text-gold" style={{
                textShadow: '0 0 30px var(--gold)',
              }}>
                ART
              </span>
              <Image
                src="/herologo1.png"
                alt=""
                width={150}
                height={150}
                className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain"
                priority
                unoptimized
                style={{
                  filter: 'drop-shadow(0 0 20px var(--gold))',
                }}
              />
              <span className="text-gold" style={{
                textShadow: '0 0 30px var(--gold)',
              }}>
                AVENUE
              </span>
            </motion.h1>
            
            <motion.p
              className="text-base md:text-lg lg:text-xl mb-10 max-w-3xl mx-auto mt-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                color: 'var(--gold)',
                textShadow: '0 0 10px var(--gold)',
              }}>
              Welcome to our gaming art studio your one stop destination for high quality custom logos, banners, emotes, overlays, and hand-drawn illustrations. We specialize in creating unique and eye catching artwork for gamers, streamers, YouTubers, and content creators who want to build a strong, memorable online identity.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
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
                Our Work
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

