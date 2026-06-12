'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Building2 } from 'lucide-react';
import { Experience } from '@/data/portfolio';

interface TimelineItemProps {
  exp: Experience;
  index: number;
}

function TimelineItem({ exp, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between md:mb-16 mb-10 group">
      {/* Connector Dot */}
      <div className="absolute left-6 md:left-1/2 top-0 md:-translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-indigo-600 flex items-center justify-center z-10 shadow-lg group-hover:scale-110 group-hover:border-emerald-500 transition-all duration-300">
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 group-hover:bg-emerald-400 transition-colors" />
      </div>

      {/* Spacer / Left side content (only on desktop) */}
      <div className="hidden md:block w-[47%] text-right pr-8">
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-end gap-2 text-indigo-400 font-semibold mb-2">
              <Calendar className="w-4 h-4" />
              <span>{exp.date}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-300 border border-indigo-900/50 text-sm font-medium">
              <Building2 className="w-3.5 h-3.5" />
              <span>{exp.companyName}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Card Content (on the other side) */}
      <div className="w-full md:w-[47%] pl-14 md:pl-0 md:group-hover:translate-y-[-4px] transition-transform duration-300">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-3xl p-8 relative hover:shadow-xl hover:shadow-indigo-950/20 transition-all"
        >
          {/* Logo / Company Name in Mobile View */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden border border-white/5 flex items-center justify-center p-1.5 shrink-0">
              <img
                src={exp.icon}
                alt={exp.companyName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white leading-snug">
                {exp.title}
              </h4>
              <p className="text-sm text-indigo-400 font-medium md:hidden flex items-center gap-1 mt-0.5">
                <span>{exp.companyName}</span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-slate-400">{exp.date}</span>
              </p>
              <p className="hidden md:block text-slate-400 text-sm mt-0.5 font-medium">
                {exp.companyName}
              </p>
            </div>
          </div>

          {/* Points */}
          <ul className="space-y-2 text-sm text-slate-400 list-none pl-0">
            {exp.points.map((pt, i) => (
              <li key={i} className="relative pl-5 leading-relaxed">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
                {pt}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right side alignment (only on desktop for odd indices) */}
      <div className="hidden md:block w-[47%] pl-8 text-left">
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-start gap-2 text-indigo-400 font-semibold mb-2">
              <Calendar className="w-4 h-4" />
              <span>{exp.date}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 text-indigo-300 border border-indigo-900/50 text-sm font-medium">
              <Building2 className="w-3.5 h-3.5" />
              <span>{exp.companyName}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-10 px-4">
      {/* Vertical Connecting Line */}
      <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-0.5 bg-indigo-600/30 md:-translate-x-1/2" />

      {/* Timeline List */}
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <TimelineItem key={exp.companyName + exp.date} exp={exp} index={index} />
        ))}
      </div>
    </div>
  );
}
