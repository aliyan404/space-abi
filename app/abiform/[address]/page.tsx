'use client'

import { useState } from 'react'
import '@/style/AbiForm.css'
import '@/style/FunctionForm.css'
import FunctionList from '@/app/abiform/components/FunctionList'
import FunctionForm from '../components/FunctionForm'
import useAbi from '@/hooks/useAbi'
import { CallbackReturnType } from '@/types'
import { Contract } from 'starknet'
import { sepoliaProvider } from '@/utils/rpc-provider'
import { useAccount } from '@starknet-react/core'
import { useParams } from 'next/navigation'

export default function ABIForm() {
  const params = useParams()
  const { account } = useAccount()
  const contractAddress = params.address
  const { abi } = useAbi(contractAddress as string)
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
    const contract = new Contract(
      abi,
      contractAddress as string,
      sepoliaProvider
    )
    console.log('account', account)

    console.log('contract', contract)
    console.log('value', value)
    try {
      if (contract !== null && value?.stateMutability === 'view') {
        const res = await contract?.call(value.functionName, value.inputs)
        const res2 = '0x' + res?.toString(16)
        setResponse({
          ...response,
          [value.functionName]: (
            <div className="w-80 bg-gray-400 rounded-xl ml-5 pl-3">
              <h2 className="font-bold">reslut:</h2>
              <div className="w-4/5">{res2}</div>
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
            <div className=" w-80 bg-gray-400 rounded-lg p-4 ml-5">
              <h2 className="w-1/5">reslut:</h2>
              <div className="w-4/5">{res2}</div>
            </div>
          ),
        })
      }
    } catch (error: any) {
      console.log('handleCall error', error)
    }
  }

  return (
    <main className="flex gap-2 min-h-screen bg-slate-100">
      <div className="w-1/4 sticky top-0 h-screen">
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
      <div className="border-2 border-slate p-4 mt-6 shadow-md w-1/4">
        user Msg
      </div>
    </main>
  )
}
