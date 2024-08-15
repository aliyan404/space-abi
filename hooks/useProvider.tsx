'use client'

import { sepoliaProvider } from '@/utils/rpc-provider'
import { createContext, ReactNode, useContext, useState } from 'react'
import toast from 'react-hot-toast'

interface ProviderContextType {
  network: string
  setNetwork: (network: string) => void
  rpcNode: any
  setRpcNode: (rpcNode: any) => void
}

const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined
)

export default function NetProvider({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState<string>('sepolia')
  const [rpcNode, setRpcNode] = useState<any>(sepoliaProvider)

  return (
    <ProviderContext.Provider
      value={{ network, setNetwork, rpcNode, setRpcNode }}
    >
      {children}
    </ProviderContext.Provider>
  )
}

export function useProvider() {
  const context = useContext(ProviderContext)
  if (context === undefined) {
    throw new Error('useProvider must be used within a NetProvider')
    toast.error('useProvider must be used within a NetProvider')
  }
  return context
}
