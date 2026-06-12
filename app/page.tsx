'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Mail, Sparkles, Code2, Briefcase, MessageSquare, Compass } from 'lucide-react';
import { Github, Linkedin } from '@/components/brand-icons';
import TypingText from '@/components/typing-text';
import SkillsGrid from '@/components/skills-grid';
import { ProjectsGrid } from '@/components/project-card';
import ExperienceTimeline from '@/components/experience-timeline';
import ContactForm from '@/components/contact-form';
import ExperienceGlobe from '@/components/experience-globe';
import HeroMesh from '@/components/hero-mesh';
import { projects, experiences } from '@/data/portfolio';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. HERO SECTION */}
      <section
        id="about"
        className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-16 px-6 border-b border-slate-900/60 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/tech_about_bg.png')" }}
      >
        {/* Dark mask overlay to guarantee absolute text contrast */}
        <div className="absolute inset-0 bg-[#0B0F19]/85 backdrop-blur-[1px]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold tracking-wide">
              {/* <Sparkles className="w-3.5 h-3.5" /> */}
              <span>Available for Remote Opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Hi, I&apos;m <span className="text-indigo-400">Matthias Amire</span>
            </h1>

            <div className="text-xl sm:text-2xl font-medium text-slate-300">
              A Specialized <TypingText strings={['Frontend Engineer', 'React Native Developer', `FastAPI Developer`]} />
            </div>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              With <strong>3+ years of professional experience</strong>, I specialize in building highly responsive, performant, and premium web and mobile applications. From building AI-powered e-commerce platforms to designing offline-first financial ecosystems, I focus on delivering visual and architectural excellence.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-full text-sm border border-indigo-500 shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.98]"
              >
                <span>Let&apos;s Build Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/media/resume.pdf"
                download="Matthias_Amire_Resume.pdf"
                className="inline-flex items-center gap-2 bg-slate-900 text-slate-300 font-semibold px-6 py-3.5 rounded-full text-sm border border-white/5 hover:bg-slate-800 hover:text-white transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/codydematth"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/codydematth/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@matthiasamire.com"
                className="p-2.5 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                aria-label="Direct Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Hero Profile Image with Floating Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-1 flex justify-center items-center relative"
          >
            {/* 3D Glassmorphic Torus Mesh Halo */}
            <HeroMesh />

            {/* Subtle animated background ring helper */}
            <div className="absolute w-72 h-72 rounded-full border border-indigo-500/5 animate-ping [animation-duration:8s] pointer-events-none" />

            <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1 bg-slate-900 border-2 border-indigo-500/30 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 border-4 border-slate-950">
                <Image
                  src="/images/avatar.png"
                  alt="Matthias Amire Profile"
                  width={300}
                  height={300}
                  priority
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SKILLS SECTION */}
      <section id="skills" className="w-full bg-[#080B13]/60 py-20 px-6 border-y border-slate-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Technology Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Skills & Core Expertise</h2>
            <p className="text-sm sm:text-base text-slate-400">
              My engineering toolbox spans production-grade frontend structures, hybrid mobile app engines, and fast backend integrations.
            </p>
          </div>

          <SkillsGrid />
        </div>
      </section>

      {/* 3. PROJECTS SHOWCASE */}
      <section id="projects" className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span> Showcases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects</h2>
            <p className="text-sm sm:text-base text-slate-400">
              A breakdown of production platforms, enterprise tools, and native mobile apps designed for real business value.
            </p>
          </div>

          <ProjectsGrid projects={projects} />
        </div>
      </section>

      {/* 4. EXPERIENCE TIMELINE */}
      <section id="experience" className="w-full bg-[#080B13]/60 py-20 px-6 border-y border-slate-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional History</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Work Experience</h2>
            <p className="text-sm sm:text-base text-slate-400">
              Over 3 years of experience contributing to startup squads, enterprise systems, and cross-functional teams.
            </p>
          </div>

          {/* 3D Geographic Operations Globe */}
          <div className="w-full flex justify-center py-4">
            <ExperienceGlobe />
          </div>

          <ExperienceTimeline experiences={experiences} />
        </div>
      </section>

      {/* 5. CONTACT FORM */}
      <section id="contact" className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Let&apos;s Connect</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Get In Touch</h2>
            <p className="text-sm sm:text-base text-slate-400">
              I am open to contract engagements, freelance requests, and full-time engineering offers. Drop a message!
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}

