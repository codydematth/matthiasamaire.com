'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from '@/components/brand-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-auto border-t border-slate-900 bg-[#070A12] text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden rounded-full">
              <Image
                src="/images/logo.png"
                alt="Matthias Amire Logo"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-white tracking-wide">
              Matthias Amire
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Frontend & React Native Engineer. Rebuilt with Next.js & Framer Motion.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/#about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/#skills" className="hover:text-white transition-colors">
            Skills
          </Link>
          <Link href="/#projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/#experience" className="hover:text-white transition-colors">
            Experience
          </Link>
          <Link href="/#contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/apps/vaultvoss" className="hover:text-indigo-400 font-medium transition-colors">
            VaultVoss App
          </Link>
        </div>

        {/* Socials & Top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/codydematth"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-950 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/codydematth/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-950 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:support@matthiasamire.com"
            className="p-2 rounded-full bg-slate-950 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={handleScrollToTop}
            className="p-2 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900 hover:text-white hover:border-indigo-700 hover:bg-indigo-900 transition-all ml-2"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 text-center sm:text-left">
        <div>
          &copy; {currentYear} Matthias Amire. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/apps/vaultvoss/privacy" className="hover:text-slate-400 transition-colors">
            VaultVoss Privacy
          </Link>
          <Link href="/apps/vaultvoss/terms" className="hover:text-slate-400 transition-colors">
            VaultVoss Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
