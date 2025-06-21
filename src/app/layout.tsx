import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import { Header, Footer } from './components/layouts'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})


export const metadata: Metadata = {
  title: 'StreamFlix',
  description: 'The application should be responsive, interactive, and provide a smooth user experience for browsing and watching movies.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className='min-h-screen'>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
