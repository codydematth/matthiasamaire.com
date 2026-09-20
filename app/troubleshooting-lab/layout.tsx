import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Troubleshooting Lab | Matthias Amire — Technical Problem Solving & RCA',
  description: 'Empirical troubleshooting lab documenting systematic root-cause analysis, API integration debugging, authentication handshakes, and mobile performance investigations.',
  keywords: [
    'Technical Troubleshooting',
    'Root Cause Analysis',
    'Developer Support Engineering',
    'Technical Support Engineer',
    'API Integration Debugging',
    'OAuth Troubleshooting',
    'Mobile Debugging',
    'Matthias Amire'
  ],
  alternates: {
    canonical: '/troubleshooting-lab',
  },
  openGraph: {
    title: 'Troubleshooting Lab | Matthias Amire',
    description: 'Systematic root-cause analysis and defect investigation lab by Matthias Amire.',
    url: 'https://matthiasamire.com/troubleshooting-lab',
    siteName: 'Matthias Amire Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TroubleshootingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
