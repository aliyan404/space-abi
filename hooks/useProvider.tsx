'use client'

import { sepoliaProvider } from '@/components/rpc-provider'
import { createContext, ReactNode, useContext, useState } from 'react'
import toast from 'react-hot-toast'

interface ProviderContextType {
  network: string
  setNetwork: (network: string) => void
  rpcProvider: any
  setRpcProvider: (rpcNode: any) => void
}

const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined
)

export default function NetProvider({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState<string>('sepolia')
  const [rpcProvider, setRpcProvider] = useState<any>(sepoliaProvider)

  return (
    <ProviderContext.Provider
      value={{ network, setNetwork, rpcProvider, setRpcProvider }}
    >
      {children}
    </ProviderContext.Provider>
  )
}

export function useNetProvider() {
  const context = useContext(ProviderContext)
  if (context === undefined) {
    toast.error('useProvider must be used within a NetProvider')
    throw new Error('useProvider must be used within a NetProvider')  }
  return context
}
