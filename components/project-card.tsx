'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, LayoutGrid, Smartphone, Globe } from 'lucide-react';
import { Github } from '@/components/brand-icons';
import { Project } from '@/data/portfolio';
import ThreeDTilt from '@/components/three-d-tilt';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isLarge = !!project.highlights && project.highlights.length > 0;

  return (
    <ThreeDTilt
      className={`${
        isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
      }`}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
        className="w-full h-full bento-card glass rounded-3xl p-6 flex flex-col justify-between group cursor-pointer"
      >
      <div>
        {/* Project Image */}
        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-5 bg-slate-900 border border-white/5">
          <img
            src={project.image || '/images/herobg.png'}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
          
          {/* Subtitle Badge */}
          <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-950/90 text-indigo-400 border border-indigo-900/50 backdrop-blur-sm">
            {project.subTitle}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-indigo-600 text-slate-400 hover:text-white border border-white/5 transition-all"
                title="View Code"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-emerald-600 text-slate-400 hover:text-white border border-white/5 transition-all"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {project.description}
        </p>

        {isLarge && project.highlights && (
          <ul className="mb-6 space-y-1.5 text-xs text-slate-400 list-none pl-0">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="relative pl-4 leading-relaxed">
                <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-indigo-500" />
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.slice(0, isLarge ? 8 : 4).map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-white/[0.04]"
          >
            {tag.trim()}
          </span>
        ))}
        {!isLarge && project.tags.length > 4 && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-900 text-slate-500 border border-white/[0.04]">
            +{project.tags.length - 4}
          </span>
        )}
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
    if (filter === 'web') return project.subTitle.toLowerCase().includes('web');
    if (filter === 'app') return project.subTitle.toLowerCase().includes('app');
    return true;
  });

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
            filter === 'all'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25'
              : 'bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:bg-slate-900'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          All Projects
        </button>
        <button
          onClick={() => setFilter('web')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
            filter === 'web'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25'
              : 'bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Web Dev
        </button>
        <button
          onClick={() => setFilter('app')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
            filter === 'app'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25'
              : 'bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          Mobile Apps
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
