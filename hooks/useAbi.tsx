'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Abi } from 'starknet'
import { useNetProvider } from './useNetProvider'
import { getImplementedClass, getImplementedClassAbi } from '@/utils/abi'

export default function useAbi(
  contractAddress: string,
  type: 'Normal' | 'Proxy' = 'Normal'
) {
  const [abi, setAbi] = useState<Abi>([])
  const [isMounted, setIsMounted] = useState(false)
  const { rpcProvider } = useNetProvider()

  const updateAbi = async (
    rpcNode: any,
    contractAddress: string,
    type: 'Normal' | 'Proxy' = 'Normal'
  ) => {
    try {
      if (!contractAddress) return
      const res1 = await rpcNode.getClassAt(contractAddress)
      console.log('getClassAt:', res1)
      if (type === 'Normal') {
        setAbi(res1?.abi)
      } else if (type === 'Proxy') {
        const classHash = await getImplementedClass(
          abi,
          contractAddress,
          rpcProvider
        )
        const classAbi = await getImplementedClassAbi(classHash, rpcProvider)
        console.log('getImplementedAbi:', classAbi)
        setAbi(classAbi)
      }

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
