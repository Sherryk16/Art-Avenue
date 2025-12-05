'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'Alex Streamer',
    role: 'Twitch Partner',
    content: 'Art Avenue transformed my channel with their incredible branding package. The quality is unmatched!',
    rating: 5,
  },
  {
    name: 'Sarah Gaming',
    role: 'YouTube Creator',
    content: 'The 3D model they created for me is absolutely stunning. My viewers love it!',
    rating: 5,
  },
  {
    name: 'Mike Plays',
    role: 'Content Creator',
    content: 'Fast delivery, premium quality, and amazing support. Couldn\'t ask for more!',
    rating: 5,
  },
];

export default function Testimonials() {
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
            <span className="text-gold">What Our Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Trusted by streamers worldwide for premium design services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="premium-card p-8 rounded-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="font-bold text-gold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[#d4af37] text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed italic">&quot;{testimonial.content}&quot;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

