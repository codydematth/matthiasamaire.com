'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';
import ThreeDTilt from '@/components/three-d-tilt';

const skillDescriptions: Record<string, string> = {
  'TypeScript': 'Robust, type-safe development for highly scalable and error-free applications.',
  'Next.js': 'Advanced App Router architectures, optimized Server Actions, and Server-Side Rendering (SSR).',
  'React': 'Component-driven frontend systems, hooks design patterns, and efficient state tree lifecycles.',
  'React Native': 'Native mobile app architectures running cross-platform on iOS and Android.',
  'Redux': 'Scalable global store state management with Redux Toolkit and middleware integrations.',
  'FastAPI': 'High-performance Python microservices, REST APIs, and background processing tasks.',
  'Git': 'Advanced version control pipelines, branch merging strategies, and collaborative code reviews.',
  'Tailwind CSS': 'Modern utility-first styling layouts, dynamic themes, and custom styling systems.',
  'Three.js': 'Premium 3D canvas rendering, shader structures, and visual immersive web experiences.',
  'Expo': 'Rapid app development ecosystems, OTA updates, and native modules tooling.',
};

export default function SkillsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {skills.map((skill, index) => {
        const desc = skillDescriptions[skill.name] || 'Core technology skill';
        
        // Let some cards be slightly larger for Bento Grid layout variation
        const isFeatured = skill.name === 'Next.js' || skill.name === 'React Native';

        return (
          <ThreeDTilt
            key={skill.name}
            className={`${
              isFeatured ? 'col-span-2 sm:col-span-2' : ''
            }`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
              className={`w-full h-full bento-card glass rounded-2xl p-5 flex flex-col justify-between group relative ${
                isFeatured ? 'bg-slate-900/40 border border-indigo-500/20 shadow-md shadow-indigo-950/20' : ''
              }`}
            >
            {/* Hover Glow Light */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/25 transition-colors duration-300 pointer-events-none" />

            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center p-2 mb-4 border border-white/5 group-hover:border-indigo-500/30 transition-colors duration-300 shrink-0">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 ${skill.invert ? 'invert' : ''}`}
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                {skill.name}
              </h4>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-2 sm:line-clamp-3">
              {desc}
            </p>
          </motion.div>
          </ThreeDTilt>
        );
      })}
    </div>
  );
}
