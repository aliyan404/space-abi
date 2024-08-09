'use client'
import { provider } from '@/utils/rpc-provider'
import { useEffect, useState } from 'react'
import { Abi } from 'starknet'

export default function useAbi(contractAddress: string) {
  const [abi, setAbi] = useState<Abi>([])

  useEffect(() => {
    const getAbi = async () => {
      try {
        const { abi } = await provider.getClassAt(contractAddress)
        setAbi(abi)
      } catch (error) {
        console.log('getAbi error:', error)
      }
    }
    getAbi()
  }, [contractAddress])

  return { abi }
}
