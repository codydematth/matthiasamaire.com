"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Landmark,
  CalendarRange,
  PieChart,
  Lock,
  Mail,
  ArrowLeft,
  ArrowUpRight,
  Download,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VaultVossPage() {
  const features = [
    {
      icon: <Landmark className="w-6 h-6 text-indigo-400" />,
      title: "Net Worth Tracking",
      desc: "Seamlessly log and categorize assets (cash, investments, property) and liabilities (loans, mortgages, credit cards) for a real-time net worth valuation.",
    },
    {
      icon: <PieChart className="w-6 h-6 text-emerald-400" />,
      title: "Flexible Budget Goals",
      desc: "Establish category spending caps (dining, shopping, bills) and track your limits with interactive monthly progress gauges.",
    },
    {
      icon: <CalendarRange className="w-6 h-6 text-blue-400" />,
      title: "Smart Recurring Bills",
      desc: "Map out active subscriptions, utility cycles, and regular income. Receive clean timelines of upcoming expenses so you never miss a payment.",
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      title: "Local-First Biometrics",
      desc: "Protect records using hardware authentication (Face ID / Touch ID) linked directly to the system Keychain. Credentials never leave your secure enclave.",
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
            VaultVoss is a private, offline-first personal ledger utility. Track
            your assets, monitor liabilities, schedule recurring subscriptions,
            and secure your financial dashboard using device-native biometric
            lock screens. Simple, encrypted, and designed to put you in control.
          </p>

          {/* App Store / APK Badges */}
          <div className="flex flex-wrap gap-4 pt-2">
            {/* Primary Android APK Download */}
            <a
              href="https://github.com/codydematth/matthiasamaire.com/releases/download/v1.0.0/vaultvoss.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 px-5 border border-indigo-400/30 shadow-lg shadow-indigo-600/25 active:scale-95 transition-all group"
            >
              <Download className="w-6 h-6 text-indigo-100 group-hover:translate-y-0.5 transition-transform" />
              <div className="text-left leading-none">
                <p className="text-[10px] text-indigo-200 uppercase tracking-widest font-semibold">
                  Direct Download
                </p>
                <p className="text-base font-bold font-sans">Android APK</p>
              </div>
            </a>

            {/* Google Play (Store Pending -> Downloads APK) */}
            <a
              href="https://github.com/codydematth/matthiasamaire.com/releases/download/v1.0.0/vaultvoss.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 px-5 border border-white/10 shadow-lg active:scale-95 transition-all group"
            >
              {/* Play Store SVG */}
              <svg
                className="w-6 h-6 fill-white group-hover:scale-105 transition-transform"
                viewBox="0 0 24 24"
              >
                <path d="M5.25 3.001c-.134 0-.265.037-.383.111l11.028 11.028 3.733-3.733c.732-.732.732-1.92 0-2.652L6.16 3.284a1.86 1.86 0 0 0-.91-.283M4.25 4.156v15.688c0 .285.068.567.198.819l8.04-8.04-8.04-8.04c-.13.252-.198.534-.198.819m8.966 7.643 8.324 8.324c.334-.582.383-1.282.115-1.95L13.216 11.8M5.132 20.89a1.86 1.86 0 0 0 1.028.11L19.627 13.5l-3.733 3.733-10.762 3.657" />
              </svg>
              <div className="text-left leading-none">
                <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-medium">
                  Google Play (Pending)
                </p>
                <p className="text-base font-bold font-sans">Get APK File</p>
              </div>
            </a>

            {/* App Store (Coming Soon) */}
            <div
              className="flex items-center gap-3 bg-slate-950/60 text-slate-500 rounded-xl py-3 px-5 border border-white/5 cursor-not-allowed opacity-75"
              title="iOS App Store release coming soon"
            >
              {/* Apple SVG */}
              <svg className="w-6 h-6 fill-slate-500" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.97.08 2.06-.52 2.81-1.33z" />
              </svg>
              <div className="text-left leading-none">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                  App Store
                </p>
                <p className="text-base font-bold font-sans">Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Manual Install Banner */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-slate-300 text-xs sm:text-sm flex items-center gap-3 mt-4">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <p className="leading-relaxed">
              <strong className="text-white font-semibold">
                Manual Download Available:
              </strong>{" "}
              Pending Google Play Store publication, you can download and
              install the Android APK directly on your device.
            </p>
          </div>
        </motion.div>

        {/* Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex justify-center relative z-10"
        >
          {/* Phone Frame wrapper loading vault_image */}
          <div className="relative w-64 h-[550px] max-w-full drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-2xl overflow-hidden border border-white/10 p-1.5 bg-slate-950/40 backdrop-blur-sm">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="/images/vault_image.png"
                alt="VaultVoss Mobile App Interface"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Breakdown */}
      <section className="bg-[#080B13] border-t border-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Full Feature Breakdown
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              VaultVoss bundles essential tracking parameters under a unified
              security architecture.
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
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
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
          If you are experiencing issue log syncing, biometric validation
          issues, or need help managing your account records, please write to
          us.
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
          <Link
            href="/apps/vaultvoss/privacy"
            className="hover:text-indigo-400 flex items-center gap-0.5"
          >
            Privacy Policy
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/apps/vaultvoss/terms"
            className="hover:text-indigo-400 flex items-center gap-0.5"
          >
            Terms of Service
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
