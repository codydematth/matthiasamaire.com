import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VaultVoss | Premium Personal Asset & Expense Tracker',
  description:
    'VaultVoss is a private, offline-first personal ledger utility. Track your assets, monitor liabilities, schedule recurring subscriptions, and secure your financial dashboard.',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'VaultVoss | Premium Personal Asset & Expense Tracker',
    description:
      'VaultVoss is a private, offline-first personal ledger utility. Track your assets, monitor liabilities, schedule recurring subscriptions, and secure your financial dashboard.',
    url: 'https://matthiasamire.com/apps/vaultvoss',
    siteName: 'VaultVoss',
    locale: 'en_US',
    type: 'website',
  },
};

export default function VaultVossLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-20 md:pt-24">{children}</div>;
}
