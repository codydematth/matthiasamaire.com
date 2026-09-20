'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  LayoutGrid,
  Smartphone,
  Globe,
  Wrench,
  UserCheck,
  ChevronDown,
  Layers
} from 'lucide-react';
import { Github } from '@/components/brand-icons';
import { Project } from '@/data/portfolio';
import ThreeDTilt from '@/components/three-d-tilt';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasStructuredDetails =
    !!project.productScope ||
    (project.contributions && project.contributions.length > 0) ||
    (project.troubleshootingFocus && project.troubleshootingFocus.length > 0);

  return (
    <ThreeDTilt className="col-span-1">
      <motion.div
        layout
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
        className="w-full h-full bento-card glass rounded-3xl p-6 flex flex-col justify-between group hover:border-indigo-500/30 transition-all duration-300"
      >
        <div>
          {/* Project Image */}
          <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 bg-slate-950 border border-white/5">
            <img
              src={project.image || '/images/herobg.png'}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

            {/* Subtitle Badge */}
            <span className="absolute top-3.5 left-3.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-950/90 text-indigo-300 border border-indigo-900/60 backdrop-blur-md shadow-lg">
              {project.subTitle}
            </span>
          </div>

          {/* Title & Action Links */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 shrink-0">
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-indigo-600 text-slate-400 hover:text-white border border-white/10 transition-all"
                  title="View Source Code"
                  aria-label={`View source code for ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
                  rel={project.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-emerald-600 text-slate-400 hover:text-white border border-white/10 transition-all"
                  title="Visit Live Application"
                  aria-label={`Visit live application for ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Core Summary */}
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Expandable Engineering & Troubleshooting Deep Dive */}
          {hasStructuredDetails && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-slate-900/70 border border-white/5 hover:border-indigo-500/30 text-xs font-semibold text-indigo-300 hover:text-white transition-all cursor-pointer"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isExpanded ? 'Hide Technical Breakdown' : 'View Engineering & Troubleshooting Breakdown'}</span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mt-3 space-y-3 pt-1"
                  >
                    {/* 1. Product Scope */}
                    {project.productScope && (
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                          <Layers className="w-3 h-3 text-sky-400" />
                          <span>1. What It Does</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {project.productScope}
                        </p>
                      </div>
                    )}

                    {/* 2. Personal Contribution */}
                    {project.contributions && project.contributions.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                          <UserCheck className="w-3 h-3 text-emerald-400" />
                          <span>2. Personal Contribution</span>
                        </div>
                        <ul className="space-y-1 list-none pl-0">
                          {project.contributions.map((c, i) => (
                            <li key={i} className="text-xs text-slate-400 pl-3 relative leading-relaxed">
                              <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 3. Troubleshooting & Engineering Problems */}
                    {project.troubleshootingFocus && project.troubleshootingFocus.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-indigo-500/20 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                          <Wrench className="w-3 h-3 text-indigo-400" />
                          <span>3. Troubleshooting & Engineering Challenges</span>
                        </div>
                        <ul className="space-y-1 list-none pl-0">
                          {project.troubleshootingFocus.map((tf, i) => (
                            <li key={i} className="text-xs text-slate-400 pl-3 relative leading-relaxed">
                              <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              {tf}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Highlights summary (when not expanded) */}
          {!isExpanded && project.highlights && project.highlights.length > 0 && (
            <ul className="mb-4 space-y-1.5 text-xs text-slate-400 list-none pl-0">
              {project.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="relative pl-3.5 leading-relaxed">
                  <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-indigo-400" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-white/[0.04]"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </motion.div>
    </ThreeDTilt>
  );
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectGridProps) {
  const [filter, setFilter] = useState<'all' | 'web' | 'app'>('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'web') return project.subTitle.toLowerCase().includes('web') || project.subTitle.toLowerCase().includes('commerce') || project.subTitle.toLowerCase().includes('portal') || project.subTitle.toLowerCase().includes('platform');
    if (filter === 'app') return project.subTitle.toLowerCase().includes('app') || project.subTitle.toLowerCase().includes('mobile');
    return true;
  });

  return (
    <div className="w-full space-y-10">
      {/* Category Filter Buttons */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
            filter === 'all'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25'
              : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>All Production Projects</span>
        </button>
        <button
          onClick={() => setFilter('web')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
            filter === 'web'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25'
              : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Web & Portals</span>
        </button>
        <button
          onClick={() => setFilter('app')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
            filter === 'app'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25'
              : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Applications</span>
        </button>
      </div>

      {/* Grid Container */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
