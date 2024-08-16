import { StarknetProvider } from '@/components/starknet-provider'
import { ThemeProvider } from '@/components/theme-provider'
import NetProvider from '@/hooks/useProvider'
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
        <NetProvider>
          {children}
          <Toaster
            toastOptions={{
              className: 'toast',
            }}
          />
        </NetProvider>
      </StarknetProvider>
    </ThemeProvider>
  )
}
