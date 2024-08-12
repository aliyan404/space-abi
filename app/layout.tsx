import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StarknetProvider } from '../components/starknet-provider'
import '@/style/globals.css'
import Header from '@/components/Header'

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
          <Header />
          {children}
        </StarknetProvider>
      </body>
    </html>
  )
}
