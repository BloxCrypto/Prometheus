import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prometheus Web Obfuscator',
  description: 'Professional JavaScript and HTML Obfuscation Tool',
  openGraph: {
    title: 'Prometheus Web Obfuscator',
    description: 'Transform your JavaScript and HTML code into obfuscated forms',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
