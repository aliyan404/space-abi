'use client'

import { Contract, shortString } from 'starknet'
import useAbi from './useAbi'
import { useNetProvider } from './useNetProvider'
import { useAccount, useNetwork } from '@starknet-react/core'
import { CallbackReturnType } from '@/types'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { mainnet, sepolia } from '@starknet-react/chains'
import { interactSwitchRes } from '@/utils'

export default function useInteract(contractAddress: string) {
  const { abi, isMounted } = useAbi(contractAddress)
  const { rpcProvider, network } = useNetProvider()
  const { account } = useAccount()
  const connectNetwork = useNetwork().chain.id
  const chains = { mainnet: mainnet, sepolia: sepolia } as any
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
        console.log('View outputs:', value.functionName, value.outputs)
        console.log('View function result:', res)

        return interactSwitchRes(res?.toString(),value.outputs[0]?.type)
      } else if (value?.stateMutability === 'external') {
        if (!account) {
          toast.error('Please connect your wallet')
          return
        }

        if (chains[network]?.id !== connectNetwork) {
          if (connectNetwork === chains['sepolia']?.id) {
            toast.error('Please switch to Mainnet network')
            return
          } else if (connectNetwork === chains['mainnet']?.id) {
            toast.error('Please switch to Sepolia network')
            return
          }
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
