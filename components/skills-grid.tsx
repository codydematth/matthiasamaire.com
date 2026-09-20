"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layout,
  Smartphone,
  Network,
  Bug,
  KeyRound,
  Server,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { skillCategories } from "@/data/portfolio";
import ThreeDTilt from "@/components/three-d-tilt";

const categoryIcons: Record<string, React.ReactNode> = {
  programming: <Code2 className="w-4 h-4 text-indigo-400" />,
  frontend: <Layout className="w-4 h-4 text-sky-400" />,
  mobile: <Smartphone className="w-4 h-4 text-emerald-400" />,
  "apis-web": <Network className="w-4 h-4 text-purple-400" />,
  troubleshooting: <Bug className="w-4 h-4 text-rose-400" />,
  authentication: <KeyRound className="w-4 h-4 text-amber-400" />,
  backend: <Server className="w-4 h-4 text-teal-400" />,
  "tools-cicd": <Workflow className="w-4 h-4 text-blue-400" />,
};

export default function SkillsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const displayedCategories =
    selectedCategory === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <div className="w-full space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
            selectedCategory === "all"
              ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25"
              : "bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800"
          }`}
        >
          <span>All Categories</span>
        </button>

        {skillCategories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25"
                  : "bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800"
              }`}
            >
              {categoryIcons[category.id]}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Categorized Bento Sections */}
      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-white/10">
                    {categoryIcons[category.id] || (
                      <Code2 className="w-4 h-4 text-indigo-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-400 border border-white/5">
                  {category.skills.length} competencies
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map((skill) => (
                  <ThreeDTilt key={skill.name}>
                    <div className="w-full h-full bento-card glass rounded-2xl p-5 flex flex-col justify-between group relative hover:border-indigo-500/30 transition-all duration-300">
                      {/* Glow Accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/25 transition-colors duration-300 pointer-events-none" />

                      <div>
                        {/* Icon Container */}
                        <div className="w-11 h-11 rounded-xl bg-slate-950 flex items-center justify-center p-2 mb-3.5 border border-white/5 group-hover:border-indigo-500/30 transition-colors duration-300 shrink-0">
                          {skill.image ? (
                            <img
                              src={skill.image}
                              alt={skill.name}
                              className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 ${
                                skill.invert ? "invert" : ""
                              }`}
                              loading="lazy"
                            />
                          ) : (
                            <div className="text-indigo-400 group-hover:scale-110 transition-transform">
                              {categoryIcons[category.id] || (
                                <CheckCircle2 className="w-5 h-5" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                          {skill.name}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                          {skill.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                        <span>Production verified</span>
                      </div>
                    </div>
                  </ThreeDTilt>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
