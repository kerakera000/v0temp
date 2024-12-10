import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WELLKUL - Fitness & Boxing Studio',
  description: '夢の体になる！楽しみながらできる本格ボクシング・フィットネス',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="bg-[#1a1a1a]">
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}

