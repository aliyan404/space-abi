import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState, useEffect } from 'react'
import useInteract from '@/hooks/useInteract'
import { useNetProvider } from '@/hooks/useNetProvider'
import useSWR from 'swr'
import LoadingBar from './LoadingBar'
import { interactSwitchRes, shortenAddress } from '@/utils'
import CopyBtn from '@/components/copy-btn'
import { ContarctMsgReturnType } from '@/types'
import useFunction from '@/hooks/useFunction'
import { getImplementedClass, getImplementedClassAbi } from '@/utils/abi'
import useAbi from '@/hooks/useAbi'

export default function ContractMsg({
  contractAddress,
}: {
  contractAddress: string
}) {
  const { functions, isFunctionReady, addressType } =
    useFunction(contractAddress)
  const { network, rpcProvider } = useNetProvider()
  const { interact, isContractReady, abi, updateAbi } =
    useInteract(contractAddress)

  const { data, isLoading, mutate } = useSWR(
    ['/contractMsg', isFunctionReady, isContractReady],
    async () => {
      console.log(
        'isContractReady, isFunctionReady,',
        isContractReady,
        isFunctionReady
      )
      if (isContractReady && isFunctionReady) {
        let currentAbi = abi

        if (addressType === 'Proxy') {
          const classHash = await getImplementedClass(
            abi,
            contractAddress,
            rpcProvider
          )

          const classAbi = await getImplementedClassAbi(classHash, rpcProvider)
          updateAbi(classAbi, classHash, 'Proxy')

          currentAbi = classAbi
        }

        const showFunctions =
          functions?.filter(
            (fn: any) =>
              fn.state_mutability === 'view' && fn.inputs.length === 0
          ) || []
        console.log('showFunctions', showFunctions)

        const result = await Promise.all(
          showFunctions.map(async (fn: any) => {
            try {
              const res = await interact(
                {
                  functionName: fn.name,
                  stateMutability: fn.state_mutability,
                  inputs: fn.inputs,
                  outputs: fn.outputs,
                },
                currentAbi
              )
              return {
                functionName: fn.name,
                result: res,
              } as ContarctMsgReturnType
            } catch (error) {
              console.error(`Error in function ${fn.name}:`, error)
              return
            }
          })
        )
        return result.filter(
          (item: any) => item.result !== undefined && item.result !== 'Error'
        )
      }
      return null // Return null if conditions are not met
    },
    {
      revalidateOnFocus: false, // Prevent revalidation on window focus
      shouldRetryOnError: false, // Prevent retrying on error
    }
  )

  useEffect(() => {
    console.log('State changed:', {
      isContractReady,
      isFunctionReady,
      data,
      isLoading,
    })
  }, [isContractReady, isFunctionReady, data, isLoading])
  console.log('ContractMsgData: ', data)

  const isDataReady =
    data && data.every((item: any) => item.result !== undefined)

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isContractReady) {
      setProgress(25)
    } else if (isLoading) {
      setProgress(50)
    } else if (!isDataReady) {
      setProgress(75)
    } else {
      setProgress(100)
    }
  }, [isContractReady, isLoading, isDataReady])

  const [refreshingItems, setRefreshingItems] = useState<string[]>([])

  const refreshItem = async (itemName: string) => {
    setRefreshingItems((prev) => [...prev, itemName])
    const fn = functions?.find((f: any) => f.name === itemName)
    if (fn) {
      try {
        const res = await interact({
          functionName: fn.name,
          stateMutability: fn.state_mutability,
          inputs: fn.inputs,
          outputs: fn.outputs,
        })
        const updatedData = data?.map((item: ContarctMsgReturnType) =>
          item.functionName === itemName ? { ...item, result: res } : item
        )
        mutate(updatedData, false)
      } catch (error) {
        console.error(`Error refreshing ${itemName}:`, error)
      } finally {
        setRefreshingItems((prev) => prev.filter((item) => item !== itemName))
      }
    }
  }

  const contractName = interactSwitchRes(
    'core::felt252',
    data?.find((i: ContarctMsgReturnType) => i.functionName === 'name')?.result
      .value || ''
  )

  if (!isContractReady || isLoading || !isDataReady) {
    return <LoadingBar progress={progress} message="Loading Contract data..." />
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
          <CardTitle className="text-xl font-bold text-white tracking-wide">
            Contract Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700">
                {contractName}
              </span>
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-sm text-gray-500 font-mono">
                  {shortenAddress(contractAddress)}
                </span>
                <CopyBtn value={contractAddress} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-600">Network:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {network}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
          <CardTitle className="text-xl font-bold text-white tracking-wide">
            Contract Data
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-4">
              {data?.map((item: ContarctMsgReturnType) => (
                <div
                  key={item.functionName}
                  className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative ${
                    refreshingItems.includes(item.functionName)
                      ? 'animate-pulse'
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.functionName}
                    </h3>
                    <button
                      onClick={() => refreshItem(item.functionName)}
                      className={`absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 transition-transform duration-300 ${
                        refreshingItems.includes(item.functionName)
                          ? 'animate-spin'
                          : ''
                      }`}
                      disabled={refreshingItems.includes(item.functionName)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M23 4v6h-6"></path>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 break-all">
                    {JSON.stringify(
                      interactSwitchRes(item?.result?.type, item?.result?.value)
                    )}
                    {item?.result?.type ===
                    'core::starknet::contract_address::ContractAddress' ? (
                      <CopyBtn value={item?.result?.value} />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
