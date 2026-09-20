'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Bug,
  Search,
  ShieldAlert,
  ArrowLeft,
  Terminal,
  Activity,
  FileCode,
  Network,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import {
  troubleshootingCases,
  troubleshootingMethodology,
} from '@/data/troubleshooting';
import ThreeDTilt from '@/components/three-d-tilt';

const activeInvestigationFocusAreas = [
  {
    title: 'OAuth 2.0 Token Refresh & Deep-Link Handshakes',
    domain: 'Authentication & Security',
    icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
    summary: 'Reproducing mobile OAuth redirect loops and token race conditions when concurrent network requests intercept expired access tokens.',
    tools: ['Azure AD / Entra ID', 'Charles Proxy', 'React Native Expo', 'DevTools Network Tab']
  },
  {
    title: 'REST API Payload Serialization & Client State Drift',
    domain: 'API & Networking',
    icon: <Network className="w-5 h-5 text-sky-400" />,
    summary: 'Investigating upstream schema discrepancies, undefined field omissions, and frontend desynchronization under high-latency network conditions.',
    tools: ['FastAPI Backend', 'Postman / Curl', 'TypeScript Schemas', 'Redux Store Inspection']
  },
  {
    title: 'Mobile Viewport Jank & Unbounded Feed Re-rendering',
    domain: 'Mobile & Device',
    icon: <Cpu className="w-5 h-5 text-rose-400" />,
    summary: 'Profiling frame-rate drops and memory bloat during infinite scroll feeds in React Native through memoization and windowSize tuning.',
    tools: ['React Native Perf Monitor', 'Android Logcat', 'Xcode Instruments', 'Flipper']
  },
  {
    title: 'CORS Preflight Headers & Cloud Blob SAS Expirations',
    domain: 'Cloud & Infrastructure',
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    summary: 'Diagnosing HTTP 403 Forbidden preflight failures and clock-skewed SAS token generation during direct browser-to-blob uploads.',
    tools: ['Azure Blob Storage', 'HTTP Headers Inspection', 'Wireshark', 'Axios Interceptors']
  }
];

export default function TroubleshootingLabPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBlueprint, setShowBlueprint] = useState<boolean>(false);

  // Filter cases if any exist in the data store
  const filteredCases = troubleshootingCases.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#0B0F19] text-slate-100 pt-28 sm:pt-36 pb-20 px-6 relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-900/50">
            Engineering & Support Lab
          </span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/50 text-indigo-400 border border-indigo-900/60 text-xs font-semibold">
            <Bug className="w-3.5 h-3.5 text-rose-400" />
            <span>Empirical Defect Investigation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            Troubleshooting Lab
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A dedicated technical workbench documenting real-world software defects, API integration breakdowns, authentication anomalies, and mobile performance bottlenecks — isolated in controlled reproduction environments and resolved through systematic Root Cause Analysis (RCA).
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Rather than relying on superficial trial-and-error, every case study adheres to a strict 12-point diagnostic discipline from incident reproduction to prevention.
          </p>
        </div>

        {/* The 12-Step Diagnostic Framework Showcase */}
        <div className="glass rounded-3xl p-8 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                <span>The 12-Point Root Cause Analysis Protocol</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Standardized methodology applied to isolate, reproduce, and resolve complex software failures.
              </p>
            </div>

            <button
              onClick={() => setShowBlueprint(!showBlueprint)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-900 text-indigo-300 border border-indigo-500/30 hover:bg-slate-800 hover:text-white transition-all cursor-pointer shrink-0"
            >
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              <span>{showBlueprint ? 'Hide Case Study Schema' : 'Inspect Case Study Schema'}</span>
            </button>
          </div>

          {/* Interactive Blueprint Drawer */}
          <AnimatePresence>
            {showBlueprint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-slate-950/80 rounded-2xl p-5 border border-white/10 font-mono text-xs text-slate-300 space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-white/5 pb-2 mb-2">
                  <span>TypeScript Case Study Interface Contract</span>
                  <span className="text-emerald-400">data/troubleshooting.ts</span>
                </div>
                <pre className="overflow-x-auto text-[11px] leading-relaxed text-indigo-200">
{`interface TroubleshootingCaseStudy {
  id: string;
  title: string;
  category: 'API & Networking' | 'Authentication & Security' | 'Mobile & Device' | 'Frontend & State';
  status: 'Investigating' | 'Resolved' | 'Published';

  // 12 Mandatory Diagnostic Dimensions
  problemIncident: string;           // 01: Clear incident declaration & boundaries
  expectedBehavior: string;          // 02: Specification contract
  actualBehavior: string;            // 03: Observable defect & symptoms
  environment: TroubleshootingEnv;   // 04: Runtime, OS, SDK, network parameters
  reproductionSteps: string[];       // 05: Minimal reproducible step sequence
  evidence: InvestigationEvidence[]; // 06: Traces, HAR files, logs, heap snapshots
  investigation: string;             // 07: Control flow & boundary execution analysis
  hypotheses: string[];              // 08: Formulated technical hypotheses
  rootCause: string;                 // 09: Verified underlying failure mechanism
  resolution: string;                // 10: Targeted code or architectural patch
  verification: string;              // 11: Resolution verification & confirmation
  preventionLessonsLearned: string[];// 12: Runbook updates & prevention measures
}`}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 12 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {troubleshootingMethodology.map((m) => (
              <div
                key={m.step}
                className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-indigo-500/30 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    Step {m.step}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies Display Area */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Empirical Case Studies
              </h2>
              <p className="text-sm text-slate-400">
                Detailed breakdowns of investigated defects and incident post-mortems.
              </p>
            </div>

            {/* Search and Category Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {['all', 'API & Networking', 'Authentication & Security', 'Mobile & Device'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All Areas' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Case Studies List OR Professional Empty State */}
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCases.map((cs) => (
                <div key={cs.id} className="glass rounded-3xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-900/60">
                      {cs.category}
                    </span>
                    <span className="text-xs font-medium text-emerald-400">
                      {cs.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{cs.title}</h3>
                  <p className="text-xs text-slate-400">{cs.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            /* Honest, Transparent Active Investigation State */
            <div className="glass rounded-3xl p-8 sm:p-12 border border-white/10 space-y-10">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center mx-auto text-indigo-400 shadow-xl shadow-indigo-950/40">
                  <Wrench className="w-7 h-7 animate-pulse" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Active Investigations In Progress
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  I document genuine troubleshooting problems reproduced in controlled environments rather than inventing artificial metrics. Full technical reports will be published as empirical verification completes.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>4 Target Incident Scenarios in Controlled Reproduction</span>
                </div>
              </div>

              {/* Active Focus Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                {activeInvestigationFocusAreas.map((area, idx) => (
                  <ThreeDTilt key={idx}>
                    <div className="h-full bento-card glass rounded-2xl p-6 border border-white/5 space-y-4 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                            {area.icon}
                          </div>
                          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-white/5">
                            {area.domain}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white leading-snug">
                          {area.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {area.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5">
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Diagnostic Tooling
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {area.tools.map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ThreeDTilt>
                ))}
              </div>

              {/* Collaboration CTA */}
              <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    Have a complex production bug or API integration issue?
                  </h4>
                  <p className="text-xs text-slate-400">
                    I welcome discussions on challenging defects, authentication flows, and developer troubleshooting scenarios.
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-full border border-indigo-400/30 shadow-md shadow-indigo-600/20 transition-all shrink-0 active:scale-95"
                >
                  <span>Connect with Matthias</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
