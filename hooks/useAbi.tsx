'use client'
import { sepoliaProvider } from '@/utils/rpc-provider'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Abi } from 'starknet'

export default function useAbi(contractAddress: string) {
  const [abi, setAbi] = useState<Abi>([])
  const [isMounted, setIsMounted] = useState(false)

  const updateAbi = async (contractAddress: string) => {
    try {
      if (!contractAddress) return
      const { abi } = await sepoliaProvider.getClassAt(contractAddress)
      setAbi(abi)
      setIsMounted(true)
    } catch (error) {
      setIsMounted(false)
      toast.error('Invalid contract address')
    }
  }

  useEffect(() => {
    updateAbi(contractAddress)
  }, [contractAddress])

  return { abi, updateAbi, isMounted }
}
