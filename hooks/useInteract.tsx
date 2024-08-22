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
  const [isContractReady, setIsContractReady] = useState(false)

  useEffect(() => {
    if (abi && contractAddress && rpcProvider && isMounted) {
      try {
        const newContract = new Contract(abi, contractAddress, rpcProvider)
        setContract(newContract)
        setIsContractReady(true)
        console.log('Contract initialized successfully')
      } catch (error) {
        console.error('Error initializing contract:', error)
        setIsContractReady(false)
      }
    } else {
      setIsContractReady(false)
    }
  }, [abi, contractAddress, rpcProvider, isMounted])

  const interact = async (value: CallbackReturnType) => {
    if (!isContractReady || !contract) {
      throw new Error('Contract is not ready')
    }

    try {
      if (value?.stateMutability === 'view') {
        const res = await contract.call(value.functionName, value.inputs)
        console.log('View function result:', res)
        return res?.toString()
      } else if (value?.stateMutability === 'external') {
        if (!account) {
          throw new Error('Account is not connected')
        }
        contract.connect(account)
        const res = await contract.invoke(value.functionName, value.inputs)
        return res?.toString()
      }
      throw new Error('Unsupported state mutability')
    } catch (error: any) {
      console.error('handleCall error', error)
      throw error
    }
  }

  return { interact, abi, isContractReady }
}