import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VaultVoss Terms of Service | Amire Studio',
  description: 'Terms of Service agreements for VaultVoss mobile personal ledger application.',
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full min-h-screen bg-[#090C15] text-slate-300 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Content Container */}
        <article className="glass rounded-3xl p-8 md:p-12 space-y-6 text-left leading-relaxed">
          <header className="border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-black text-white mb-2">Terms of Service</h1>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Last updated: June 11, 2026
            </p>
          </header>

          <p className="text-sm sm:text-base">
            Welcome to VaultVoss. Please read these Terms of Service (&quot;Terms&quot;) carefully before using our mobile application (&quot;App&quot;) operated by Amire Studio (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
            <p className="text-sm">
              By accessing or using our App, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of the terms, you may not access the App.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Account Creation & Security</h2>
            <p className="text-sm">
              To access the full features of the App, you must register for an account. You are responsible for safeguarding your password and account details, including any biometric login credentials (like Face ID) configured on your device. We are not liable for unauthorized access resulting from your failure to secure your account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Expense Tracking & Financial Data</h2>
            <p className="text-sm">
              VaultVoss is a private, secure expense tracking utility. The data you input (such as bank balances, transactions, and net worth) is stored securely. We do not provide professional financial, tax, or investment advice. The financial analytics provided by the App are for informational and convenience purposes only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Prohibited Uses</h2>
            <p className="text-sm">
              You agree not to use the App for any illegal or unauthorized purpose. You must not attempt to breach or circumvent the security mechanisms, reverse engineer the App, or transmit any malware or destructive code.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Limitation of Liability</h2>
            <p className="text-sm">
              To the maximum extent permitted by applicable law, in no event shall Amire Studio be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, data, or other intangible losses, arising out of or relating to the use of, or inability to use, this App.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Changes to Terms</h2>
            <p className="text-sm">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide notice prior to any new terms taking effect. By continuing to access our App after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">7. Contact Us</h2>
            <p className="text-sm">
              If you have any questions about these Terms, please contact us at{' '}
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
