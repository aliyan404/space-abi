'use client'
import { sepoliaProvider } from '@/utils/rpc-provider'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Abi } from 'starknet'
import { useProvider } from './useProvider'

export default function useAbi(contractAddress: string) {
  const [abi, setAbi] = useState<Abi>([])
  const [isMounted, setIsMounted] = useState(false)
  const { rpcNode, setRpcNode } = useProvider()

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
    updateAbi(rpcNode, contractAddress)
  }, [rpcNode, contractAddress])

  return { abi, updateAbi, isMounted }
}
