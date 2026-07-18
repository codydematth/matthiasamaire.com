import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VaultVoss Privacy Policy | Amire Studio',
  description: 'Privacy Policy details for VaultVoss mobile personal asset and data tracker app.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full min-h-screen bg-[#090C15] text-slate-300 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Content Container */}
        <article className="glass rounded-3xl p-8 md:p-12 space-y-6 text-left leading-relaxed">
          <header className="border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Last updated: June 11, 2026
            </p>
          </header>

          <p className="text-sm sm:text-base">
            VaultVoss (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) respects your privacy. This Privacy Policy describes how we collect, protect, and use your information when you use our mobile application (&quot;App&quot;).
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
            <p className="text-sm">
              We only collect information necessary to provide and improve the App&apos;s services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong className="text-white">Account Info:</strong> Your name, email, and password when you register.
              </li>
              <li>
                <strong className="text-white">Financial Data:</strong> Transactions, budgets, assets, and liabilities you manually log inside the App.
              </li>
              <li>
                <strong className="text-white">Preferences:</strong> Your settings preferences, including whether biometric authentication is enabled.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Biometric & Secure Credentials</h2>
            <p className="text-sm">
              When you enable biometric login (like Face ID or Touch ID), your raw biometric data is processed entirely by your device&apos;s operating system security chip (Secure Enclave or Keychain). VaultVoss never has access to, stores, or transmits your actual biometric data. We securely cache your verified email and password credentials in the operating system&apos;s secure store (Keychain/KeyStore) via industry-standard encryption for local authentication checks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. How We Use Information</h2>
            <p className="text-sm">
              We use your information to operate the App, calculate your financial summaries (such as net worth and budget progress), authenticate your logins, and send transactional email notifications. We do not sell, rent, or trade your personal or financial data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Security of Data</h2>
            <p className="text-sm">
              The security of your data is our highest priority. We use military-grade encryption standards to transmit your data to our secure servers and employ strict security protocols for storage. However, please remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Your Data Choices</h2>
            <p className="text-sm">
              You have full control over your data. You can edit or delete any logged transactions or assets at any time. You can also permanently delete your account and all associated financial records directly from the Profile settings screen inside the App.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Contact Us</h2>
            <p className="text-sm">
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at{' '}
              <a href="mailto:support@matthiasamire.com" className="text-indigo-400 font-bold hover:underline">
                support@matthiasamire.com
              </a>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
