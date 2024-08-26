'use client'

import { useEffect, useState, useCallback } from 'react'
import useAbi from './useAbi'
import { useNetProvider } from './useNetProvider'
import { getAddressType, getFunctionList } from '@/utils/functionlist'

export default function useFunction(contractAddress: string) {
  const { abi: lastAbi, isMounted } = useAbi(contractAddress)
  const [functions, setFunctions] = useState<any>([])
  const [isFunctionReady, setIsFunctionReady] = useState<boolean>(false)
  const { rpcProvider } = useNetProvider()

  const filterFunctions = useCallback(async () => {
    if (!isMounted) return

    try {
      const type = getAddressType(lastAbi)
      let res = []

      if (type === 'Class') {
        const abi = await rpcProvider.getClassHashAt(contractAddress)
        res = getFunctionList(abi)
        console.log('ClassFunctionList:', res)
      } else if (type === 'Contract') {
        res = getFunctionList(lastAbi)
        console.log('ContractFunctionList:', res)
      }

      setFunctions(res)
      setIsFunctionReady(true)
    } catch (error) {
      setIsFunctionReady(false)
      console.log('filterFunctions error:', error)
    }
  }, [lastAbi, isMounted, rpcProvider, contractAddress])

  useEffect(() => {
    filterFunctions()
  }, [filterFunctions])

  return { functions, isFunctionReady }
}