import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrains = JetBrains_Mono({ weight: ['400', '800'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Talk',
  description: 'Your Next.js favorite chat aplication',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/chat.png' sizes='any' />
      </head>
      <body className={jetbrains.className}>{children}</body>
    </html>
  )
}
