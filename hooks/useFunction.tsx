'use client'

import { useEffect, useMemo, useState } from 'react'
import useAbi from './useAbi'

export default function useFunction(contractAddress: string) {
  const { abi } = useAbi(contractAddress)
  const [functions, setFunctions] = useState<any>([])

  const filterFunctions = useMemo(() => {
    if (!abi) return

    const allFunctions = abi.flatMap((item: any) => {
      if (item.type === 'function') {
        return [item]
      } else if (item.type === 'interface') {
        return item?.items || []
      } else {
        return []
      }
    })

    const functions = allFunctions.filter(
      (item: any) => item.type === 'function'
    )
    return functions
  }, [abi])

  useEffect(() => {
    try {
      setFunctions(filterFunctions)
    } catch (error) {}
  }, [filterFunctions])

  return functions
}
