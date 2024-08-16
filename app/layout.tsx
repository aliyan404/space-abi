import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/style/globals.css'
import { Providers } from './providers'
import SwitchMode from '@/components/switch-mode'

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
            <div className='fixed bottom-4 right-4 z-50'>
              <SwitchMode/>
            </div>
        </Providers>
      </body>
    </html>
  )
}
