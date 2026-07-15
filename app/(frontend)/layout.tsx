import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { HashScrollHandler } from './components/common/HashScrollHandler'
import { ScrollToTop } from './components/common/ScrollToTop'
import { getHeader, getFooter } from '../../utilities/api'
import React from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Payload CMS + Next.js Starter',
  description: 'A beautiful and scalable website starter template',
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerData = await getHeader()
  const footerData = await getFooter()

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <HashScrollHandler />
        <ScrollToTop />
        <Header data={headerData} />
        {/* Padding-top to avoid content hiding behind fixed header */}
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer data={footerData} />
      </body>
    </html>
  )
}
