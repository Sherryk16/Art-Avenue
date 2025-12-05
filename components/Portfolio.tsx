'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image_url: string;
  video_url?: string | null;
  is_featured: boolean;
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const _isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    async function getFeaturedPortfolioItems() {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('id, category, title, description, image_url, video_url, is_featured')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching featured portfolio items:', error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setPortfolioItems(data || []);
      setLoading(false);
    }

    getFeaturedPortfolioItems();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-black text-center text-gold">
        Loading featured work...
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-black text-center text-red-500">
        Error: {error}
      </section>
    );
  }

  if (portfolioItems.length === 0) {
    return (
      <section id="portfolio" className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-black text-center text-gray-400">
        No featured work available yet!
      </section>
    );
  }

  return (
    <section ref={ref} id="portfolio" className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            <span className="text-gold">Feature Work</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Showcasing premium designs crafted for streamers worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="premium-card overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 overflow-hidden">
                {item.video_url ? (
                  <video
                    src={item.video_url}
                    controls
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    quality={100}
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-black/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#d4af37]">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description || 'Premium design crafted for streamers'}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/portfolio">
            <motion.button
              className="premium-btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Portfolio
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

