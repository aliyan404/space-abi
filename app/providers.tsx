'use client'

import { StarknetProvider } from '@/components/starknet-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StarknetProvider>
        {children}
        <Toaster
          toastOptions={{
            className: 'toast',
          }}
        />
      </StarknetProvider>
    </ThemeProvider>
  )
}
