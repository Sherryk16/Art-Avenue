'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Logos', href: '/services#logos' },
      { name: 'Banners', href: '/services#banners' },
      { name: 'Static Overlays', href: '/services#static-overlays' },
      { name: 'Animated Overlays', href: '/services#animated-overlays' },
      { name: 'Emotes', href: '/services#emotes' },
      { name: 'Animations', href: '/services#animations' },
      { name: '2D Characters', href: '/services#2d-characters' },
      { name: 'Intro', href: '/services#intro' },
      { name: 'Outro', href: '/services#outro' },
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredService, setHoveredService] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-3 left-0 right-0 z-[100] transition-all duration-300`}
    >
      <div className="px-4">
        <div
          className={`mx-auto max-w-6xl rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-black/90 border-[#d4af37]/30 backdrop-blur-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] gold-glow'
              : 'bg-black/80 border-[#d4af37]/20 backdrop-blur-lg'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png?v=1.1"
                alt="Art Avenue"
                width={200}
                height={80}
                priority
                unoptimized={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite loop
                  target.src = "/herologo.png?v=1.1"; // Fallback to alternative logo
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setHoveredService(true)}
                  onMouseLeave={() => item.dropdown && setHoveredService(false)}
                >
                  <Link
                    href={item.href}
                    className="relative text-sm font-medium transition-colors duration-300"
                    style={{
                      color: pathname === item.href ? '#d4af37' : '#d1d5db',
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== item.href) {
                        e.currentTarget.style.color = '#d4af37';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== item.href && !hoveredService) {
                        e.currentTarget.style.color = '#d1d5db';
                      }
                    }}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: '#d4af37', boxShadow: '0 0 10px rgba(212,175,55,0.8)' }}
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: hoveredService ? 1 : 0,
                        y: hoveredService ? 0 : -10,
                        pointerEvents: hoveredService ? 'auto' : 'none',
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-[#d4af37]/20 bg-black/90 backdrop-blur-lg shadow-[0_0_20px_rgba(212,175,55,0.15)] py-2 z-50"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors duration-200"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-[#d4af37] transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="mx-auto max-w-6xl mt-2 rounded-2xl border border-[#d4af37]/20 bg-black/70 backdrop-blur-lg py-3 space-y-2 px-4">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-[#d4af37] bg-[#d4af37]/10'
                      : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#d4af37]/5'
                  }`}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-1.5 text-xs text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/5 rounded-lg transition-colors duration-200"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
