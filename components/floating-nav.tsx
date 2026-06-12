'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVaultVossRoute = pathname.startsWith('/apps/vaultvoss');

  const navItems = isVaultVossRoute
    ? [
        { name: 'App Home', href: '/apps/vaultvoss' },
        { name: 'Privacy Policy', href: '/apps/vaultvoss/privacy' },
        { name: 'Terms of Service', href: '/apps/vaultvoss/terms' },
        { name: 'Developer Portfolio', href: '/' },
      ]
    : [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
        { name: 'VaultVoss App', href: '/apps/vaultvoss' },
      ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full transition-all duration-300 ${
        scrolled ? 'glass shadow-lg py-3 px-6' : 'bg-transparent py-5 px-6'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm tracking-tighter group-hover:bg-emerald-500 transition-colors duration-300">
            MA
          </div>
          <span className="font-semibold text-white tracking-wide group-hover:text-indigo-400 transition-colors duration-300">
            Matthias Amire
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isExternal = item.href.startsWith('http') || item.href.startsWith('/apps/vaultvoss') || (isVaultVossRoute && item.href === '/');
            const isActive = !isExternal && !isVaultVossRoute && pathname === '/' && pathname + item.href === pathname;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => !isExternal ? handleLinkClick(e, item.href) : undefined}
                className={`relative px-3 py-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-white flex items-center gap-1 ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {item.name}
                {isExternal && item.href !== '/' && (
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-slate-400 hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-6 glass rounded-2xl shadow-xl flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item, index) => {
              const isExternal = item.href.startsWith('http') || item.href.startsWith('/apps/vaultvoss') || (isVaultVossRoute && item.href === '/');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => !isExternal ? handleLinkClick(e, item.href) : setIsOpen(false)}
                  className="text-slate-300 hover:text-white text-base font-medium py-1 transition-colors flex items-center justify-between"
                >
                  {item.name}
                  {isExternal && item.href !== '/' && (
                    <ArrowUpRight className="w-4 h-4 text-slate-500" />
                  )}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
