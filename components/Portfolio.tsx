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

  const groupedItems: { [key: string]: PortfolioItem[] } = portfolioItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: PortfolioItem[] });

  const customCategoryOrder = [
    'Logo',
    'Banner',
    'Overlays',
    'Emotes',
    'Hand Drawn',
    'Animated Emotes',
  ];

  const sortedCategories = Object.keys(groupedItems).sort((a, b) => {
    const indexA = customCategoryOrder.indexOf(a);
    const indexB = customCategoryOrder.indexOf(b);

    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const getCategoryDescription = (category: string) => {
    switch (category.toLowerCase()) {
      case 'logo':
        return 'Custom Gaming Logos Designed to Define Your Identity.<br />Strong, unique, and perfectly crafted to represent your brand.';
      case 'banner':
        return 'Eye-Catching Banners That Make Your Profile Stand Out.<br />Designed for YouTube, Twitch, Discord, and all gaming platforms.';
      case 'overlays':
        return 'Stream-Ready Overlays for a Professional, Clean Look.<br />Enhance your stream with premium, well-designed graphics.';
      case 'emotes':
        return 'Custom Emotes That Express Your Personality.<br />Cute, fun, expressive emotes made for Twitch & Discord.';
      case 'hand drawn':
        return 'Hand-Drawn Illustrations Crafted With Detail & Creativity.<br />Original artwork made with passion, style, and artistic depth.';
      case 'animated emotes':
        return 'Dynamic Emotes That Bring Your Personality to Life.<br />Engage your audience with vibrant animated expressions.';
      default:
        return 'Explore our collection of premium designs crafted for streamers worldwide';
    }
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-black text-center text-gold">
        Loading categories...
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
        No categories available yet!
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
            <span className="text-gold">Our Creative Categories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore a diverse range of high-quality custom art services.
          </p>
        </motion.div>

        {sortedCategories.map((category) => {
          const itemsInCategory = groupedItems[category];
          if (itemsInCategory.length === 0) return null;

          const isLogoCategory = category.toLowerCase() === 'logo';
          const maxItems = 16;
          const gridCols = 'grid-cols-4';
          const maxWidth = 'max-w-md';

          return (
            <motion.div
              key={category}
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
                <span className="text-gold">{category}</span>
              </h3>
              <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8 text-center" dangerouslySetInnerHTML={{ __html: getCategoryDescription(category) }} />
              
              <div className={`grid ${gridCols} gap-1.5 ${maxWidth} mx-auto`}>
                {itemsInCategory.slice(0, maxItems).map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="premium-card overflow-hidden group cursor-pointer rounded-md aspect-square"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.08, boxShadow: '0 0 15px rgba(212,175,55,0.4)' }}
                  >
                    <div className="relative w-full h-full overflow-hidden p-1">
                      {item.video_url ? (
                        <video
                          src={item.video_url}
                          autoPlay
                          loop
                          muted
                          playsInline
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
                          quality={75}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

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