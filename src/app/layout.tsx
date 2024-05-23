import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrains = JetBrains_Mono({ weight: ['400', '800'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Talk',
  description: 'Your Next.js favorite chat aplication',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <link rel='icon' href='/chat.png' sizes='any' />
      </head>
      <body className={jetbrains.className}>{children}</body>
    </html>
  )
}
