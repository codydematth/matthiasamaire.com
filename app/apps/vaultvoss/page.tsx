'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Smartphone, Landmark, CalendarRange, PieChart, Lock, Mail, ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function VaultVossPage() {
  const features = [
    {
      icon: <Landmark className="w-6 h-6 text-indigo-400" />,
      title: 'Net Worth Tracking',
      desc: 'Seamlessly log and categorize assets (cash, investments, property) and liabilities (loans, mortgages, credit cards) for a real-time net worth valuation.',
    },
    {
      icon: <PieChart className="w-6 h-6 text-emerald-400" />,
      title: 'Flexible Budget Goals',
      desc: 'Establish category spending caps (dining, shopping, bills) and track your limits with interactive monthly progress gauges.',
    },
    {
      icon: <CalendarRange className="w-6 h-6 text-blue-400" />,
      title: 'Smart Recurring Bills',
      desc: 'Map out active subscriptions, utility cycles, and regular income. Receive clean timelines of upcoming expenses so you never miss a payment.',
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      title: 'Local-First Biometrics',
      desc: 'Protect records using hardware authentication (Face ID / Touch ID) linked directly to the system Keychain. Credentials never leave your secure enclave.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#090C15]">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 text-xs font-semibold tracking-wide">
            <Shield className="w-3.5 h-3.5" />
            <span>Published by Amire Studio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            VaultVoss
          </h1>
          <p className="text-xl sm:text-2xl text-indigo-300 font-semibold">
            Premium Personal Asset & Expense Tracker
          </p>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
            VaultVoss is a private, offline-first personal ledger utility. Track your assets, monitor liabilities, schedule recurring subscriptions, and secure your financial dashboard using device-native biometric lock screens. Simple, encrypted, and designed to put you in control.
          </p>

          {/* App Store Badges */}
          <div className="flex flex-wrap gap-4 pt-4">
            {/* App Store */}
            <a
              href="#"
              className="flex items-center gap-3 bg-black hover:bg-slate-900 text-white rounded-xl py-3 px-5 border border-white/10 shadow-lg active:scale-95 transition-all"
            >
              {/* Apple SVG */}
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.97.08 2.06-.52 2.81-1.33z" />
              </svg>
              <div className="text-left leading-none">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Download on the</p>
                <p className="text-base font-bold font-sans">App Store</p>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="#"
              className="flex items-center gap-3 bg-black hover:bg-slate-900 text-white rounded-xl py-3 px-5 border border-white/10 shadow-lg active:scale-95 transition-all"
            >
              {/* Play Store SVG */}
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M5.25 3.001c-.134 0-.265.037-.383.111l11.028 11.028 3.733-3.733c.732-.732.732-1.92 0-2.652L6.16 3.284a1.86 1.86 0 0 0-.91-.283M4.25 4.156v15.688c0 .285.068.567.198.819l8.04-8.04-8.04-8.04c-.13.252-.198.534-.198.819m8.966 7.643 8.324 8.324c.334-.582.383-1.282.115-1.95L13.216 11.8M5.132 20.89a1.86 1.86 0 0 0 1.028.11L19.627 13.5l-3.733 3.733-10.762 3.657" />
              </svg>
              <div className="text-left leading-none">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Get it on</p>
                <p className="text-base font-bold font-sans">Google Play</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex justify-center relative"
        >
          {/* Phone Frame Mockup in HTML/CSS */}
          <div className="relative w-64 h-[480px] bg-slate-950 border-[6px] border-slate-800 rounded-[36px] shadow-2xl overflow-hidden">
            {/* Speaker/Camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-900 rounded-full mb-1" />
            </div>

            {/* Simulated App Screen */}
            <div className="w-full h-full pt-8 px-4 flex flex-col justify-between pb-6 bg-[#0B0F19] text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Dashboard</p>
                  <h4 className="text-sm font-bold text-white">Net Worth</h4>
                </div>
                <div className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-900 flex items-center justify-center">
                  <Shield className="w-3 h-3 text-indigo-400" />
                </div>
              </div>

              {/* Net Worth Figure */}
              <div className="py-2">
                <p className="text-[20px] font-black text-white">$145,280.50</p>
                <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">+4.2% this month</p>
              </div>

              {/* Mini Asset vs Debt card */}
              <div className="grid grid-cols-2 gap-2 my-2">
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-white/[0.04]">
                  <p className="text-[9px] text-slate-500 font-semibold uppercase">Assets</p>
                  <p className="text-xs font-bold text-white">$162,400.00</p>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-white/[0.04]">
                  <p className="text-[9px] text-slate-500 font-semibold uppercase">Liabilities</p>
                  <p className="text-xs font-bold text-red-400">$17,119.50</p>
                </div>
              </div>

              {/* Mini Progress Goal */}
              <div className="bg-slate-900/60 p-3 rounded-lg border border-white/[0.04] space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-semibold">Budget (Groceries)</span>
                  <span className="text-white font-bold">$340 / $500</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-[68%]" />
                </div>
              </div>

              {/* Secure screen indicator */}
              <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] text-indigo-300 font-medium bg-indigo-950/20 py-1.5 rounded-lg border border-indigo-900/20">
                <Lock className="w-3.5 h-3.5" />
                <span>Device Encrypted</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Breakdown */}
      <section className="bg-[#080B13] border-t border-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full Feature Breakdown</h2>
            <p className="text-sm sm:text-base text-slate-400">
              VaultVoss bundles essential tracking parameters under a unified security architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="glass rounded-3xl p-6 flex items-start gap-4 hover:border-slate-800 transition-all duration-300"
              >
                <div className="p-3 bg-slate-950 rounded-2xl border border-white/5">
                  {feat.icon}
                </div>
                <div className="space-y-1.5 text-left">
                  <h4 className="text-lg font-bold text-white">{feat.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support and Legal Footer Area */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h3 className="text-2xl font-bold text-white">Need Support?</h3>
        <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          If you are experiencing issue log syncing, biometric validation issues, or need help managing your account records, please write to us.
        </p>

        <a
          href="mailto:support@matthiasamire.com"
          className="inline-flex items-center gap-2 bg-indigo-650/40 text-indigo-300 hover:text-white hover:bg-indigo-900 border border-indigo-800 py-3.5 px-6 rounded-2xl text-sm font-semibold transition-all"
        >
          <Mail className="w-4 h-4" />
          <span>support@matthiasamire.com</span>
        </a>

        {/* Legal Route Links */}
        <div className="flex items-center justify-center gap-6 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <Link href="/apps/vaultvoss/privacy" className="hover:text-indigo-400 flex items-center gap-0.5">
            Privacy Policy
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/apps/vaultvoss/terms" className="hover:text-indigo-400 flex items-center gap-0.5">
            Terms of Service
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
