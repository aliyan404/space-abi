'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Abi } from 'starknet'
import { useNetProvider } from './useNetProvider'

export default function useAbi(contractAddress: string) {
  const [abi, setAbi] = useState<Abi>([])
  const [isMounted, setIsMounted] = useState(false)
  const { rpcProvider } = useNetProvider()

  const updateAbi = async (rpcNode: any, contractAddress: string) => {
    try {
      if (!contractAddress) return
      const { abi } = await rpcNode.getClassAt(contractAddress)
      setAbi(abi)
      setIsMounted(true)
    } catch (error) {
      setIsMounted(false)
      toast.error('Invalid contract address')
    }
  }

  useEffect(() => {
    if (contractAddress && rpcProvider) {
      updateAbi(rpcProvider, contractAddress)
    }
  }, [rpcProvider, contractAddress])

  return { abi, updateAbi, isMounted }
}
