'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SocialIcon } from 'react-custom-social-icons';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/logo.png"
                alt="Art Avenue"
                width={200}
                height={67}
                className="h-12 w-auto"
              />
            </motion.div>
            <p className="text-gray-400 mb-4 max-w-md">
              Where Art Meets Creativity for Streamers. Premium design services crafted for creators worldwide.
            </p>
            <motion.a
              href="mailto:support@artavenueproductions.com"
              className="text-gray-400 text-sm mt-2 flex items-center"
              whileHover={{ scale: 1.05, color: '#d4af37' }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialIcon network="gmail" color="transparent" style={{ width: 24, height: 24, marginRight: 8 }} />
              support@artavenueproductions.com
            </motion.a>

            <div className="flex gap-4 mt-4">
              <motion.a
                href="https://discord.com/invite/artavenue" // Replace with actual Discord link
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SocialIcon network="discord" color="transparent" fgColor="#d4af37" style={{ width: 40, height: 40 }} />
              </motion.a>
              <motion.a
                href="https://instagram.com/artavenue_official_" // Updated Instagram link
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SocialIcon network="instagram" color="transparent" fgColor="#d4af37" style={{ width: 40, height: 40 }} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-[#d4af37]">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-[#d4af37] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-[#d4af37]">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Logo Design</li>
              <li>Stream Overlays</li>
              <li>3D Models</li>
              <li>Branding Packages</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Art Avenue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

