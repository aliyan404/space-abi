import { StarknetProvider } from '@/components/starknet-provider'
import NetProvider from '@/hooks/useProvider'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
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
  )
}
