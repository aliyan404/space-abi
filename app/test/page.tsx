'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Abi, Contract } from 'starknet'
import { ABIForm, CallbackReturnType } from 'starknet-abi-forms'
import '@/style/AbiForm.css'
import '@/style/FunctionForm.css'
import { sepoliaProvider } from '@/utils/rpc-provider'
import FunctionList from './testform'
import useAbi from '@/hooks/useAbi'

export default function Home() {
  //abi,合约地址
  // const [abi, setAbi] = useState<Abi>([])

  const [contractAddress, setContractAddress] = useState<string>('')
  const {abi, updateAbi} =useAbi(contractAddress)
  const [responses, setResponses] = useState<Record<string, any>>({})

  // //根据地址获取abi并设置
  // async function getAbi(address: any) {
  //   const { abi } = await sepoliaProvider.getClassAt(address)
  //   setAbi(abi)
  // }


  const handleCall = (value: CallbackReturnType) => {
    //获取到合约
    const contract = new Contract(abi, contractAddress, sepoliaProvider)
    console.log('contract: ', contract)
    console.log('value: ', value)

    //可读不可写
    if (contract !== null && value?.stateMutability === 'view') {
      contract?.call(value?.functionName, value?.starknetjs).then((res) => {
        console.log('call res: ', typeof res, res)
        const res2 = '0x' + res?.toString(16)
        setResponses({
          ...responses,
          [value.functionName]: (
            <div className="flex bg-slate-50">
              <h2 className="w-1/5">reslut:</h2>
              <div className="w-4/5">{res2}</div>
            </div>
          ),
        })
      })
    }

    //外部可调用
    if (contract !== null && value?.stateMutability === 'external') {
      contract?.invoke(value?.functionName, value?.starknetjs).then((res) => {
        const res2 = '0x' + res?.toString()
        setResponses({
          ...responses,
          [value.functionName]: (
            <div className="flex bg-slate-50">
              <h2 className="w-1/5">reslut:</h2>
              <div className="w-4/5">{res2}</div>
            </div>
          ),
        })
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      //根据合约地址获取abi
      if (contractAddress !== '') {
        updateAbi(contractAddress)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className="flex gap-2">
      <div className="border-2 border-t-0 border-slate p-4 shadow-md w-1/4">
        <FunctionList contractAddress={contractAddress} />
      </div>
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="flex mt-6">
            <Input
              onChange={(e) => setContractAddress(e.target.value)}
              value={contractAddress}
              placeholder="enter ur contarct address"
              className="border-2 border-slate p-4"
            ></Input>
            <Button type="submit" className="p-4 ml-4">
              Submit
            </Button>
          </div>
        </form>
        <div className="flex">
          <div className="border-2 border-slate p-4 mt-6 shadow-md w-full">
            <ABIForm
              abi={abi}
              callBackFn={handleCall}
              responses={responses}
            ></ABIForm>
          </div>
        </div>
      </div>
      <div className="border-2 border-slate p-4 mt-6 shadow-md w-1/4"></div>
    </main>
  )
}