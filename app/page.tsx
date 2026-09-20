'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  Code2,
  Briefcase,
  MessageSquare,
  Compass,
  Wrench,
  Bug,
  ShieldCheck,
  Layers,
  Download,
} from 'lucide-react';
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
        id="home"
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-6 border-b border-slate-900/60 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/tech_about_bg.png')" }}
      >
        {/* Dark mask overlay to guarantee absolute text contrast */}
        <div className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-[2px]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-900/60 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for International Opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Hi, I&apos;m <span className="text-indigo-400">Matthias Amire</span>
            </h1>

            <div className="text-xl sm:text-2xl font-medium text-slate-300">
              A Specialized{' '}
              <TypingText
                strings={[
                  'Software Engineer',
                  'Frontend & Mobile Specialist',
                  'API & Integration Engineer',
                  'Technical Problem Solver'
                ]}
              />
            </div>

            {/* Core Hero Statement */}
            <div className="space-y-3 max-w-2xl">
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                Software Engineer specializing in frontend, mobile applications, APIs, and technical troubleshooting.
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                With <strong>3+ years of professional development experience</strong>, I build production web and mobile applications using React, Next.js, React Native, and TypeScript. I particularly enjoy investigating difficult bugs, debugging upstream API integrations, and solving complex technical problems across the stack.
              </p>
            </div>

            {/* Action Buttons: Direct Resume Downloads & CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-full text-sm border border-indigo-500 shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/media/Matthias-Amire-Software-Engineer-Resume.pdf"
                download="Matthias-Amire-Software-Engineer-Resume.pdf"
                className="group inline-flex items-center gap-2 bg-slate-900 text-slate-200 font-semibold px-5 py-3.5 rounded-full text-xs sm:text-sm border border-white/10 hover:bg-slate-800 hover:text-white hover:border-indigo-500/40 shadow-lg shadow-black/20 transition-all duration-300 cursor-pointer active:scale-[0.98]"
                title="Download Software Engineering Resume (Frontend & Mobile)"
              >
                <Download className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Resume: Software Engineer</span>
              </a>

              <a
                href="/media/Matthias-Amire-Technical-Support-Engineer-Resume.pdf"
                download="Matthias-Amire-Technical-Support-Engineer-Resume.pdf"
                className="group inline-flex items-center gap-2 bg-slate-900 text-slate-200 font-semibold px-5 py-3.5 rounded-full text-xs sm:text-sm border border-white/10 hover:bg-slate-800 hover:text-white hover:border-emerald-500/40 shadow-lg shadow-black/20 transition-all duration-300 cursor-pointer active:scale-[0.98]"
                title="Download Technical Support & Troubleshooting Resume"
              >
                <Download className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Resume: Technical Support</span>
              </a>
            </div>

            {/* Socials & Direct Reach */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://github.com/codydematth"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/codydematth/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@matthiasamire.com"
                className="p-2.5 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                aria-label="Direct Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <span className="text-xs text-slate-500 pl-2">support@matthiasamire.com</span>
            </div>
          </motion.div>

          {/* Hero Profile Image with 3D Mesh */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-1 flex justify-center items-center relative"
          >
            {/* 3D Glassmorphic Torus Mesh Halo */}
            <HeroMesh />

            {/* Subtle animated background ring helper */}
            <div className="absolute w-72 h-72 rounded-full border border-indigo-500/10 animate-ping [animation-duration:8s] pointer-events-none" />

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

      {/* 2. ABOUT SECTION */}
      <section id="about" className="w-full py-20 px-6 border-b border-slate-950 bg-[#080B13]/80">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Professional Narrative</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">About Matthias Amire</h2>
            <p className="text-sm sm:text-base text-slate-400">
              A software engineering foundation focused on building reliable production systems and methodically resolving complex software problems.
            </p>
          </div>

          {/* Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Narrative Text */}
            <div className="lg:col-span-7 glass rounded-3xl p-8 space-y-5 border border-white/5">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Engineering Production Software with a Natural Gravitation Toward Troubleshooting
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Over the past <strong>3+ years</strong>, I have worked as a professional software engineer building and scaling web and mobile applications using <strong>React, Next.js, React Native, Expo, and TypeScript</strong>. My work spans public-facing consumer platforms, government regulatory systems, e-commerce marketplaces, and offline-first mobile utilities.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Throughout my development career, I have consistently gravitated toward <strong>debugging, root-cause investigation, and integration troubleshooting</strong>. Whether it is tracking down race conditions in payment webhooks, resolving OAuth redirect loops, diagnosing frame-rate drops in deep mobile lists, or resolving cross-origin network failures, I find deep satisfaction in dissecting how software behaves at its boundaries and engineering resilient solutions.
              </p>

              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-1.5">
                <span className="font-semibold text-indigo-300 block">Target Expansion Areas:</span>
                <p className="text-slate-400">
                  Building on this solid engineering foundation, I am actively expanding toward <strong>Developer Support Engineering, Technical Support Engineering, Implementation Engineering, and Integration Engineering</strong> roles — where hands-on code understanding directly empowers developers, partners, and enterprise customers to overcome complex technical barriers.
                </p>
              </div>
            </div>

            {/* Right Pillars / Bento Highlights */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="glass rounded-2xl p-6 border border-white/5 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Full-Lifecycle SWE Experience</h4>
                    <p className="text-xs text-slate-400">React &bull; Next.js &bull; React Native &bull; TypeScript</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Proven track record constructing user-facing client architectures, state management systems, and cross-platform native mobile applications.
                </p>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/5 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-950/60 text-rose-400">
                    <Bug className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Systematic Root Cause Analysis</h4>
                    <p className="text-xs text-slate-400">Isolation &bull; Reproduction &bull; Resolution</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Disciplined defect isolation using DevTools, network inspect, logging, and minimal reproducible harnesses to fix real underlying causes.
                </p>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/5 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">APIs & Authentication Integration</h4>
                    <p className="text-xs text-slate-400">OAuth 2.0 &bull; Azure AD &bull; REST &bull; Webhooks</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extensive practical exposure configuring token lifecycles, Azure identity handshakes, and third-party integration pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section id="skills" className="w-full bg-[#0B0F19] py-20 px-6 border-b border-slate-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Technology Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Skills & Core Expertise</h2>
            <p className="text-sm sm:text-base text-slate-400">
              Organized into distinct engineering competencies supported directly by verified production experience.
            </p>
          </div>

          <SkillsGrid />
        </div>
      </section>

      {/* 4. TROUBLESHOOTING LAB TEASER */}
      <section className="w-full py-16 px-6 bg-[#080B13]/70 border-b border-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-3xl p-8 sm:p-10 border border-indigo-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-900/60 text-xs font-semibold">
                  <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Interactive Engineering Lab</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Explore the Troubleshooting Lab
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  I maintain an empirical engineering workbench dedicated to reproducing, isolating, and investigating difficult software problems — including OAuth handshakes, REST API serialization discrepancies, and mobile thread performance.
                </p>

                <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/5">12-Point RCA Protocol</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/5">Network Trace Analysis</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/5">Controlled Reproduction</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/5">Zero Fabricated Data</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/troubleshooting-lab"
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3.5 rounded-2xl text-sm border border-indigo-400/30 shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
                >
                  <span>Visit Troubleshooting Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 text-slate-300 hover:text-white font-medium px-5 py-3 rounded-2xl text-xs border border-white/5 hover:bg-slate-800 transition-all text-center"
                >
                  <span>Discuss a Problem Scenario</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SHOWCASE */}
      <section id="projects" className="w-full py-20 px-6 border-b border-slate-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Production Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects</h2>
            <p className="text-sm sm:text-base text-slate-400">
              A breakdown of production applications, enterprise platforms, and native mobile utilities with verified personal contributions and troubleshooting focus.
            </p>
          </div>

          <ProjectsGrid projects={projects} />
        </div>
      </section>

      {/* 6. EXPERIENCE TIMELINE */}
      <section id="experience" className="w-full bg-[#080B13]/80 py-20 px-4 sm:px-6 border-b border-slate-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional History</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Work Experience</h2>
            <p className="text-sm sm:text-base text-slate-400">
              Over 3 years contributing to cross-functional teams, startup squads, and enterprise systems.
            </p>
          </div>

          {/* 3D Geographic Operations Globe */}
          <div className="w-full flex justify-center py-4">
            <ExperienceGlobe />
          </div>

          <ExperienceTimeline experiences={experiences} />
        </div>
      </section>

      {/* 7. CONTACT FORM */}
      <section id="contact" className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Let&apos;s Connect</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Get In Touch</h2>
            <p className="text-sm sm:text-base text-slate-400">
              I am open to international Software Engineering, Developer Support, Technical Support, and Integration Engineering opportunities. Drop a message!
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
