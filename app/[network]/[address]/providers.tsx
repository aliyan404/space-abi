'use client'

import { FuctionsProvider } from '@/hooks/useFunctionsProvider'
import { useParams } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const contractAddress = params.address as string
  return (
    <FuctionsProvider initailAddress={contractAddress}>
      {children}
    </FuctionsProvider>
  )
}
