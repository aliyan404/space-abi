'use client'

import { Contract } from 'starknet'
import useAbi from './useAbi'
import { useNetProvider } from './useProvider'
import { useAccount } from '@starknet-react/core'
import { CallbackReturnType } from '@/types'
import { useEffect, useState } from 'react'

export default function useInteract(contractAddress: string) {
  const { abi, isMounted } = useAbi(contractAddress)
  const { rpcProvider } = useNetProvider()
  const { account } = useAccount()
  const [contract, setContract] = useState<Contract | null>(null)

  useEffect(() => {
    if (abi && contractAddress && rpcProvider && isMounted) {
      try {
        const newContract = new Contract(abi, contractAddress, rpcProvider)
        setContract(newContract)
        console.log('Contract initialized successfully')
      } catch (error) {
        console.error('Error initializing contract:', error)
      }
    }
  }, [abi, contractAddress, rpcProvider, isMounted])

  const interact = async (value: CallbackReturnType) => {
    try {
      if (contract !== null && value?.stateMutability === 'view') {
        const res = await contract?.call(value.functionName, value.inputs)
        console.log('View function result:', res)
        return res?.toString()
      } else if (contract !== null && value?.stateMutability === 'external') {
        if (account) {
          contract.connect(account)
        } else {
          console.log('account is null')
          return
        }
        const res = await contract?.invoke(value.functionName, value.inputs)
        return res?.toString()
      }
    } catch (error: any) {
      console.log('handleCall error', error)
    }
  }
  return { interact, abi }
}
