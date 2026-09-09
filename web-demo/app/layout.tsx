import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ONUG Fall 2026 Keynote — One Control Plane, Every Domain',
  description: 'ONUG Fall AI Networking Summit · New York City · October 28, 2026 — Keynote Demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-50 overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
