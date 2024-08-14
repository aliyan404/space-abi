import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StarknetProvider } from './provider'
import '@/style/globals.css'

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
        <StarknetProvider>
            {children}
        </StarknetProvider>
      </body>
    </html>
  )
}
