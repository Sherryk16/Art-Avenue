'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [showCurtains, setShowCurtains] = useState(false); // Controls rendering of curtains
  const [areCurtainsAnimatingOut, setAreCurtainsAnimatingOut] = useState(false); // Triggers curtains to open
  const [isFullLoadingScreenVisible, setIsFullLoadingScreenVisible] = useState(true); // Control component unmount

  useEffect(() => {
    // Phase 1: Logo and text are visible immediately (by default)
    // Phase 2: Start curtains animation after a delay
    const curtainAnimationTrigger = setTimeout(() => {
      setShowCurtains(true); // Render curtains
      setAreCurtainsAnimatingOut(true); // Trigger curtains to animate out immediately upon rendering
    }, 1500); // Wait 1.5 seconds with text/logo visible before curtains move

    // Phase 3: Hide the entire loading screen after curtains animation completes
    const hideFullLoadingScreenTrigger = setTimeout(() => {
      setIsFullLoadingScreenVisible(false); // Unmount the component
    }, 1500 + 700); // Initial delay (1.5s) + curtain animation duration (0.7s)

    return () => {
      clearTimeout(curtainAnimationTrigger);
      clearTimeout(hideFullLoadingScreenTrigger);
    };
  }, []);

  if (!isFullLoadingScreenVisible) return null;

  return (
    <AnimatePresence>
      {isFullLoadingScreenVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Only fade out the entire screen container
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Loading Content - Logo and Text */} 
          <motion.div
            className="relative z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 1, y: 0, scale: 1 }} // Always visible initially
            animate={{ opacity: 1, y: 0, scale: 1 }} // Keep visible until full screen unmounts
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="mb-4"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/logo.png"
                alt="Art Avenue"
                width={400}
                height={200}
                className="w-auto h-24 md:h-32 lg:h-40"
                priority
                style={{
                  filter: 'drop-shadow(0 0 20px var(--gold))',
                }}
              />
            </motion.div>
            <motion.div
              className="text-xl md:text-2xl text-gold font-bold"
              initial={{ opacity: 1, y: 0 }} // Always visible initially
              animate={{ opacity: 1, y: 0 }} // Keep visible
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-bodoni), serif',
                textShadow: '0 0 15px var(--gold)',
              }}
            >
              <span className="loading-shimmer inline-block px-4 py-2 rounded-full">
                Loading…
              </span>
            </motion.div>

            {/* Floating Particles - Animate as long as content is visible */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#d4af37] rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                initial={{ opacity: 0.3 }} 
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }} 
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Curtains - Render only when showCurtains is true and animate out */}
          {showCurtains && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 z-50 overflow-hidden"
                initial={{ y: 0 }} // Start in closed position
                animate={areCurtainsAnimatingOut ? {
                  y: '-120%',
                  rotateX: -20,
                  scaleY: 1.15,
                } : {}} // Only define exit animation here
                transition={areCurtainsAnimatingOut ? {
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                } : { duration: 0 }} // Only animate when triggered, otherwise no transition
                style={{
                  background: 'linear-gradient(180deg, #d4af37 0%, #f4e4bc 20%, #d4af37 40%, #f4e4bc 60%, #d4af37 80%, #b8941f 100%)',
                  backgroundSize: '100% 300%',
                  transformStyle: 'preserve-3d',
                  boxShadow: 'inset 0 -25px 60px rgba(0,0,0,0.5), 0 15px 40px rgba(212,175,55,0.4)',
                  filter: 'brightness(1.15)',
                }}
              >
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 w-full h-1/2 z-50 overflow-hidden"
                initial={{ y: 0 }} // Start in closed position
                animate={areCurtainsAnimatingOut ? {
                  y: '120%',
                  rotateX: 20,
                  scaleY: 1.15,
                } : {}} // Only define exit animation here
                transition={areCurtainsAnimatingOut ? {
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                } : { duration: 0 }} // Only animate when triggered, otherwise no transition
                style={{
                  background: 'linear-gradient(0deg, #d4af37 0%, #f4e4bc 20%, #d4af37 40%, #f4e4bc 60%, #d4af37 80%, #b8941f 100%)',
                  backgroundSize: '100% 300%',
                  transformStyle: 'preserve-3d',
                  boxShadow: 'inset 0 25px 60px rgba(0,0,0,0.5), 0 -15px 40px rgba(212,175,55,0.4)',
                  filter: 'brightness(1.15)',
                }}
              >
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

