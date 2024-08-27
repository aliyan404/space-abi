'use client'

import { useEffect, useState, useCallback } from 'react'
import useAbi from './useAbi'
import { useNetProvider } from './useNetProvider'
import { getAddressType, getFunctionList } from '@/utils/functionlist'
import { getImplementedClass, getImplementedClassAbi } from '@/utils/abi'

export default function useFunction(contractAddress: string) {
  const { abi: lastAbi, isMounted } = useAbi(contractAddress)
  const [functions, setFunctions] = useState<any>([])
  const [isFunctionReady, setIsFunctionReady] = useState<boolean>(false)
  const { rpcProvider } = useNetProvider()
  const [addressType, setAddressType] = useState<'Proxy' | 'Normal'>('Normal')

  const filterFunctions = useCallback(async () => {
    if (!isMounted) return

    try {
      const type = getAddressType(lastAbi)
      let res = []

      if (type === 'Proxy') {
        const classHash = await getImplementedClass(
          lastAbi,
          contractAddress,
          rpcProvider
        )

        const abi = await getImplementedClassAbi(classHash, rpcProvider)

        console.log('getImplementedClassAbi:', abi)
        res = getFunctionList(abi)
        setAddressType('Proxy')

        console.log('ClassFunctionList:', res)
      } else if (type === 'Normal') {
        res = getFunctionList(lastAbi)
        setAddressType('Normal')

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

  return { functions, isFunctionReady, addressType }
}
