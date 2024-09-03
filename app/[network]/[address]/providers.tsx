'use client'

import { FuctionsProvider } from '@/hooks/useFunctionsProvider'
import { useParams } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const contractAddress = params.address as string
  const network = params.network as string
  return (
    <FuctionsProvider initailAddress={contractAddress} network={network}>
      {children}
    </FuctionsProvider>
  )
}
