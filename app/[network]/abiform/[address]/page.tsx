'use client'

import { useState } from 'react'
import FunctionList from '@/app/[network]/abiform/components/FunctionList'
import FunctionForm from '../components/FunctionForm'
import useAbi from '@/hooks/useAbi'
import { CallbackReturnType } from '@/types'
import { Contract } from 'starknet'
import { useAccount } from '@starknet-react/core'
import { useParams } from 'next/navigation'
import ContractMsg from '../components/ContractMsg'
import { useNetProvider } from '@/hooks/useNetProvider'

export default function ABIForm() {
  const params = useParams()
  const { account } = useAccount()
  const contractAddress = params.address
  const { abi } = useAbi(contractAddress as string)
  const { rpcProvider } = useNetProvider()
  const [selectFunctions, setSelectFunctions] = useState<any[]>([])
  const [response, setResponse] = useState<Record<string, React.ReactNode>>({})

  const handleSelect = (fn: any) => {
    if (!selectFunctions.find((f) => f.name === fn.name)) {
      setSelectFunctions([...selectFunctions, fn])
    }
  }

  const handleDelete = (fn: any) => {
    setSelectFunctions(selectFunctions.filter((f: any) => f.name !== fn.name))
  }

  const handleCall = async (value: CallbackReturnType) => {
    const contract = new Contract(abi, contractAddress as string, rpcProvider)
    try {
      if (contract !== null && value?.stateMutability === 'view') {
        const res = await contract?.call(value.functionName, value.inputs)
        const res2 = '0x' + res?.toString(16)
        setResponse({
          ...response,
          [value.functionName]: (
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
              <h2 className="font-bold text-gray-700 mb-2">Result:</h2>
              <div className="bg-gray-100 p-2 rounded">{res2}</div>
            </div>
          ),
        })
      } else if (contract !== null && value?.stateMutability === 'external') {
        if (account) {
          contract.connect(account)
        } else {
          console.log('account is null')
          return
        }
        const res = await contract?.invoke(value.functionName, value.inputs)
        const res2 = '0x' + res?.toString()
        setResponse({
          ...response,
          [value.functionName]: (
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
              <h2 className="font-bold text-gray-700 mb-2">Result:</h2>
              <div className="bg-gray-100 p-2 rounded">{res2}</div>
            </div>
          ),
        })
      }
    } catch (error: any) {
      console.log('handleCall error', error)
    }
  }

  return (
    <main className="flex gap-4 min-h-screen bg-gray-100">
      <div className="w-1/4 sticky top-0 h-screen p-4">
        <FunctionList
          contractAddress={contractAddress}
          selectFunctions={selectFunctions}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      </div>
      <div className="w-1/2 -ml-20">
        <FunctionForm
          selectFuctions={selectFunctions}
          onDelete={handleDelete}
          handleCallback={handleCall}
          response={response}
        />
      </div>
      <div className="w-1/4 p-4">
        <ContractMsg contractAddress={contractAddress as string} />
      </div>
    </main>
  )
}
