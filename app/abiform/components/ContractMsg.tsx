import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState, useEffect } from 'react'
import useFunction from '@/hooks/useFunction'
import useInteract from '@/hooks/useInteract'
import { useNetProvider } from '@/hooks/useProvider'
import useSWR from 'swr'
import { Loader2 } from 'lucide-react'
import LoadingBar from './LoadingBar'

export default function ContractMsg({
  contractAddress,
}: {
  contractAddress: string
}) {
  const functions = useFunction(contractAddress)
  const { network } = useNetProvider()
  const { interact, isContractReady } = useInteract(contractAddress)

  const { data, isLoading } = useSWR(
    isContractReady ? ['/contractMsg', functions] : null,
    async () => {
      const showFunctions =
        functions?.filter(
          (fn: any) => fn.state_mutability === 'view' && fn.inputs.length === 0
        ) || []
      console.log('showFunctions', showFunctions)

      const result = await Promise.all(
        showFunctions.map(async (fn: any) => {
          try {
            const res = await interact({
              functionName: fn.name,
              stateMutability: fn.state_mutability,
              inputs: fn.inputs,
            })
            console.log('res', res)
            return { name: fn.name, result: res }
          } catch (error) {
            console.error(`Error in function ${fn.name}:`, error)
            return { name: fn.name, result: 'Error' }
          }
        })
      )
      return result.filter(
        (item) => item.result !== undefined && item.result !== 'Error'
      )
    },
    { revalidateOnFocus: false, shouldRetryOnError: false }
  )

  console.log('data', data)

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

  if (!isContractReady || isLoading || !isDataReady) {
    return <LoadingBar progress={progress} message="Loading Contract data..." />
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
          <CardTitle className="text-xl font-bold text-white">
            Contract Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700">
                {'0X' + data?.find((i: any) => i.name === 'name')?.result}
              </span>
              <span className="text-sm text-gray-500 truncate flex-1">
                {contractAddress}
              </span>
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
          <CardTitle className="text-xl font-bold text-white">
            Contract Data
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-4">
              {data?.map((item: any) => (
                <div
                  key={item.name}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-600 break-all">
                    {JSON.stringify(item.result)}
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
