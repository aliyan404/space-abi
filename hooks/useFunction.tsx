'use client'

import { useEffect, useMemo, useState } from 'react'
import useAbi from './useAbi'

export default function useFunction(contractAddress: string) {
  const { abi } = useAbi(contractAddress)
  const [functions, setFunctions] = useState<any>([])

  const filterFunctions = useMemo(() => {
    if (!abi) return
    const functions = abi.find((item: any) => item.type === 'interface')?.items
    return functions
  }, [abi])

  useEffect(() => {
    try {
      setFunctions(filterFunctions)
    } catch (error) {}
  }, [filterFunctions])

  return functions
}
