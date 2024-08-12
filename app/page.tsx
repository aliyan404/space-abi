'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import '@/style/AbiForm.css'
import '@/style/FunctionForm.css'
import FunctionList from '@/app/components/FunctionList'
import FunctionForm from './components/FunctionForm'
import { useContract } from '@starknet-react/core'
import useAbi from '@/hooks/useAbi'

export default function Home() {
  const [contractAddress, setContractAddress] = useState<string>(
    '0x031b79a7d00cae6fba1c6c2da59c00ea8764eeff1235b8115ed04229211c590e'
  )


  const [selectFnctions, setSelectFunctions] = useState<any>([])

  const handleSelect = (fn: any) => {
    if(!selectFnctions.includes(fn)){
      setSelectFunctions([...selectFnctions, fn])
    }
  }

  const handleDelete = (fn: any) => {
    setSelectFunctions(selectFnctions.filter((f: any) => f.name !== fn.name))
  }

  return (
    <main className="flex gap-2">
      <div className="border-2 border-t-0 border-slate p-4 shadow-md w-1/4">
        <FunctionList contractAddress={contractAddress} onSelect={handleSelect}/>
      </div>
      <div className="w-1/2">
        <div className="flex mt-6">
          <Input
            onChange={(e) => setContractAddress(e.target.value)}
            value={contractAddress}
            placeholder="enter ur contarct address"
            className="border-2 border-slate p-4"
          />
        </div>
        <div className="flex">
          <div className="border-2 border-slate p-4 mt-6 shadow-md w-full">
            <FunctionForm selectFuctions={selectFnctions} onDelete={handleDelete}/>
          </div>
        </div>
      </div>
      <div className="border-2 border-slate p-4 mt-6 shadow-md w-1/4"></div>
    </main>
  )
}
