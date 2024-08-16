import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/style/globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Space ABI',
  description: 'A satrknrt abi tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}
