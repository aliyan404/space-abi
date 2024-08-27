'use client'

import { ContractAddressType } from '@/types'
import { getContractAbi } from '@/utils/abi'
import { getFunctionList } from '@/utils/functionlist'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNetProvider } from './useNetProvider'

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
  initailAddress,
}: {
  children: React.ReactNode
  initailAddress: string
}) {
  const [functions, setFunctions] = useState<any[] | null>(null)
  const [addressType, setAddressType] = useState<ContractAddressType>('Normal')
  const [isFunctionsReady, setIsFunctionsReady] = useState(false)
  const { rpcProvider } = useNetProvider()

  const updateFunctions = async (address: string, rpcProvider: any) => {
    try {
      const abi = await getContractAbi(address, rpcProvider)
      const res = await getFunctionList(abi)
      if (res) {
        setFunctions(res)
        setIsFunctionsReady(true)
      }
    } catch (error) {
      console.log('updateFuctions error', error)
      setIsFunctionsReady(false)
    }
  }

  useEffect(() => {
    if (initailAddress && rpcProvider) {
      updateFunctions(initailAddress, rpcProvider)
    }
  }, [initailAddress, rpcProvider])

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
