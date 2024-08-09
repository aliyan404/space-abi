import { provider } from '@/utils/rpc-provider'
import { useEffect, useState } from 'react'
import { Contract } from 'starknet'
import useSWR from 'swr'

async function getContractFunctions(contractAddress: string) {
  console.log('FuncontractAddress:', contractAddress)
  try {
    const { abi } = await provider.getClassAt(contractAddress)
    if (!abi) {
      console.log('ABI not found for this contract')
      return []
    }
    const functions = abi.find((item) => item.type === 'interface')?.items
    return functions || []
  } catch (error) {
    console.log('Error fetching contract functions:', error)
    return []
  }
}

export default function FunctionList({
  contractAddress,
}: {
  contractAddress: any
}) {
  const { data: functionsData } = useSWR(
    ['/functionslist', contractAddress],
    async () => {
      const res = await getContractFunctions(contractAddress)
      console.log('Fnsres:', res)
      return res
    }
  )

  return (
    <div className="flex gap-4 bg-slate-400 rounded-lg">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold text-white">Read</h1>
        {functionsData
          ?.filter((fn: any) => fn.state_mutability === 'view')
          ?.map((fn: any, index: any) => {
            return (
              <div key={index} className="flex gap-4 bg-slate-400">
                <h2>{fn.name}</h2>
              </div>
            )
          })}
      </div>
      <div className="w-1/2">
        <h1 className="text-3xl font-bold text-white">Write</h1>
        {functionsData
          ?.filter((fn: any) => fn.state_mutability === 'external')
          ?.map((fn: any, index: any) => {
            return (
              <div key={index} className="flex gap-4 bg-slate-400">
                <h2>{fn.name}</h2>
              </div>
            )
          })}
      </div>
    </div>
  )
}
