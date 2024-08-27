'use client'

import { Contract } from 'starknet'
import useAbi from './useAbi'
import { useNetProvider } from './useNetProvider'
import { useAccount, useNetwork } from '@starknet-react/core'
import { CallbackReturnType, InteractReturnType } from '@/types'
import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { mainnet, sepolia } from '@starknet-react/chains'

export default function useInteract(initialContractAddress: string) {
  const { abi, updateAbi, isMounted } = useAbi(initialContractAddress)
  const { rpcProvider, network } = useNetProvider()
  const { account } = useAccount()
  const connectNetwork = useNetwork().chain.id
  const chains = { mainnet, sepolia } as const
  const [contract, setContract] = useState<Contract | null>(null)
  const [isContractReady, setIsContractReady] = useState(false)

  useEffect(() => {
    if (abi && initialContractAddress && rpcProvider && isMounted) {
      try {
        const newContract = new Contract(
          abi,
          initialContractAddress,
          rpcProvider
        )
        setContract(newContract)
        setIsContractReady(true)
        console.log('Contract initialized successfully')
      } catch (error) {
        console.error('Error initializing contract:', error)
        setIsContractReady(false)
      }
    }
  }, [abi, initialContractAddress, rpcProvider, isMounted])

  const interact = useCallback(
    async (
      value: CallbackReturnType,
      customAbi?: any
    ): Promise<InteractReturnType> => {
      if (!isContractReady && !customAbi) {
        throw new Error('Contract is not ready')
      }

      const contractToUse = customAbi
        ? new Contract(customAbi, initialContractAddress, rpcProvider)
        : contract

      if (!contractToUse) {
        throw new Error('Contract is not available')
      }

      try {
        if (value?.stateMutability === 'view') {
          const res = await contractToUse.call(value.functionName, value.inputs)
          console.log('View outputs:', value.functionName, value.outputs)
          console.log('View function result:', res)

          return { type: value.outputs[0]?.type, value: res.toString() }
        } else if (value?.stateMutability === 'external') {
          if (!account) {
            toast.error('Please connect your wallet')
            return { type: 'Error', value: 'null' }
          }

          if (chains[network as keyof typeof chains]?.id !== connectNetwork) {
            const expectedNetwork =
              connectNetwork === chains.sepolia.id ? 'Mainnet' : 'Sepolia'
            toast.error(`Please switch to ${expectedNetwork} network`)
            return { type: 'Error', value: 'null' }
          }

          contractToUse.connect(account)
          const res = await contractToUse.invoke(
            value.functionName,
            value.inputs
          )
          return { type: value.outputs[0]?.type, value: res.toString() }
        }
        throw new Error('Unsupported state mutability')
      } catch (error: any) {
        console.error('handleCall error', error)
        throw error
      }
    },
    [isContractReady, contract, rpcProvider, account, network, connectNetwork]
  )

  return { interact, isContractReady, abi, updateAbi }
}
