'use client'

import { ContractAddressType } from '@/types'
import { getContractAbi } from '@/utils/abi'
import { getFunctionList } from '@/utils/function'
import { getRpcProvider } from '@/utils/rpcProvider'
import { createContext, useContext, useEffect, useState } from 'react'

interface FunctionsType {
  functions: any[] | null
  addressType: ContractAddressType
  setAddressType: (addressType: ContractAddressType) => void
  isFunctionsReady: boolean
  updateFunctions: (address: string, rpcProvider: any) => Promise<void>
}

const FunctionsContext = createContext<FunctionsType | undefined>(undefined)

export function FuctionsProvider({
  children,
  network,
  initailAddress,
}: {
  children: React.ReactNode
  network: string
  initailAddress: string
}) {
  const [functions, setFunctions] = useState<any[] | null>(null)
  const [addressType, setAddressType] = useState<ContractAddressType>('Normal')
  const [isFunctionsReady, setIsFunctionsReady] = useState(false)

  const updateFunctions = async (address: string, rpcProvider: any) => {
    try {
      const abi = await getContractAbi(address, rpcProvider)
      const res = getFunctionList(abi)
      if (res?.length > 0) {
        setFunctions(res)
        setIsFunctionsReady(true)
      }
    } catch (error) {
      console.log('updateFuctions error', error)
      setIsFunctionsReady(false)
    }
  }

  useEffect(() => {
    const rpcProvider = getRpcProvider(network)
    if (initailAddress && rpcProvider) {
      updateFunctions(initailAddress, rpcProvider)
    }
  }, [initailAddress, network])

  return (
    <FunctionsContext.Provider
      value={{
        functions,
        addressType,
        setAddressType,
        isFunctionsReady,
        updateFunctions,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  )
}

export function useFunctions() {
  const context = useContext(FunctionsContext)
  if (context === undefined) {
    throw new Error('useFunctions must be used within a ContractProvider')
  }
  return context
}
