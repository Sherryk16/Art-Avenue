'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image_url: string;
  video_url?: string | null;
  order?: number;
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    async function getAllPortfolioItems() {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('id, category, title, description, image_url, video_url, order')
        .order('category', { ascending: true })
        .order('order', { ascending: true });

      if (error) {
        console.error('Error fetching all portfolio items:', error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setPortfolioItems(data || []);
      setLoading(false);
    }

    getAllPortfolioItems();
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const groupedItems: { [key: string]: PortfolioItem[] } = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: PortfolioItem[] });

  const uniqueCategories = ['All', ...Array.from(new Set(portfolioItems.map(item => item.category)))].sort((a, b) => {
      if (a === 'All') return -1; // 'All' comes first
      if (b === 'All') return 1;
      return a.localeCompare(b);
  });

  const sortedCategories = Object.keys(groupedItems).sort();

  if (loading) {
    return (
      <main className="pt-32 pb-20 px-6 bg-gradient-to-b from-black to-[#0a0a0a] text-center text-gold">
        Loading portfolio...
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-32 pb-20 px-6 bg-gradient-to-b from-black to-[#0a0a0a] text-center text-red-500">
        Error: {error}
      </main>
    );
  }

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
              <span className="text-gold">Feature Work</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our collection of premium designs crafted for streamers worldwide
            </p>
          </motion.div>

          {/* Category Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {uniqueCategories.map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-gold text-gold gold-glow-hover'
                    : 'bg-gray-800 text-gray-300 hover:bg-gold/20 hover:text-gold'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'All' ? 'All Work' : category}
              </motion.button>
            ))}
          </motion.div>

          {/* Portfolio Sections by Category */}
          {sortedCategories.map((category) => {
            const itemsInCategory = groupedItems[category];
            if (itemsInCategory.length === 0) return null; // Don't render category section if no items

            return (
              <motion.div
                key={category}
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
                  <span className="text-gold">{category}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {itemsInCategory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="premium-card overflow-hidden group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
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
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Ready to Create Your Own?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let&apos;s bring your vision to life with premium design services
            </p>
            <motion.a
              href="/contact"
              className="inline-block premium-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

