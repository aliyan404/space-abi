import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useFunction from '@/hooks/useFunction'
import useInteract from '@/hooks/useInteract'
import { useNetProvider } from '@/hooks/useProvider'
import useSWR from 'swr'

export default function ContractMsg({
  contractAddress,
}: {
  contractAddress: string
}) {
  const functions = useFunction(contractAddress)
  const { network } = useNetProvider()
  const { interact } = useInteract(contractAddress)

  const { data, isLoading, error } = useSWR(
    ['/contractMsg', functions],
    async ([_, functions]) => {
      const showFuctions = functions?.filter(
        (fn: any) => fn.state_mutability === 'view' && fn.inputs.length === 0
      )

      const result = await Promise.all(
        showFuctions?.map(async (fn: any) => {
          const res = await interact({
            functionName: fn.name,
            stateMutability: fn.state_mutability,
            inputs: fn.inputs,
          })
          console.log('res', res)
          return { name: fn.name, result: res?.toString() }
        })
      )
      return result
    }
  )

  console.log('data', data)

  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contract Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            <div>
              {'0X' + data?.find((i: any) => i.name === 'name')?.result}
            </div>
            <div className="ml-5 truncate max-w-full">{contractAddress}</div>
          </div>
          <div>
            <span className="font-bold">NetWork: </span>
            {network}
          </div>
        </CardContent>
      </Card>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-lg">Contract Data</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.map((item: any) => (
              <div key={item.name} className="mb-4">
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="truncate max-w-full">
                  {JSON.stringify(item.result)}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
