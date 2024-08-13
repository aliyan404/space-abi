'use client'
import { sepoliaProvider } from '@/utils/rpc-provider'
import { useEffect, useState } from 'react'
import { Abi } from 'starknet'

export default function useAbi(contractAddress: string) {
  const [abi, setAbi] = useState<Abi>([])

  const updateAbi = async (contractAddress: string) => {
    try {
      if (!contractAddress) return
      const { abi } = await sepoliaProvider.getClassAt(contractAddress)
      setAbi(abi)
    } catch (error) {
      console.log('updateAbi error:', error)
    }
  }

  useEffect(() => {
    updateAbi(contractAddress)
  }, [contractAddress])

  return { abi, setAbi, updateAbi }
}
