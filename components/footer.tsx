"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUp, FileText, Wrench } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <p className="text-xs text-slate-400 max-w-sm">
            Software Engineer specializing in frontend, mobile applications,
            APIs, and technical troubleshooting.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-5 text-xs sm:text-sm">
          <Link
            href="/#experience"
            className="hover:text-white transition-colors"
          >
            Experience
          </Link>
          <Link
            href="/troubleshooting-lab"
            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Troubleshooting Lab</span>
          </Link>
          <Link
            href="/apps/vaultvoss"
            className="hover:text-white transition-colors"
          >
            VaultVoss App
          </Link>
        </div>

        {/* Socials & Top */}
        <div className="flex items-center gap-3">
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
            className="p-2 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900 hover:text-white hover:border-indigo-700 hover:bg-indigo-900 transition-all ml-1 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Resume Quick Access & Legal */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <span className="text-slate-400 font-medium">Download Resumes:</span>
          <a
            href="/media/Matthias-Amire-Software-Engineer-Resume.pdf"
            download="Matthias-Amire-Software-Engineer-Resume.pdf"
            className="hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3 h-3" />
            <span>Software Engineering (Resume A)</span>
          </a>
          <span className="text-slate-700 hidden sm:inline">&bull;</span>
          <a
            href="/media/Matthias-Amire-Technical-Support-Engineer-Resume.pdf"
            download="Matthias-Amire-Technical-Support-Engineer-Resume.pdf"
            className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3 h-3" />
            <span>Technical Support & Troubleshooting (Resume B)</span>
          </a>
        </div>

        <div className="flex gap-4">
          <span>&copy; {currentYear} Matthias Amire</span>
          <Link
            href="/apps/vaultvoss/privacy"
            className="hover:text-slate-400 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/apps/vaultvoss/terms"
            className="hover:text-slate-400 transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
