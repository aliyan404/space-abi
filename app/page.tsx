'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAbi from '@/hooks/useAbi'
import { useNetProvider } from '@/hooks/useProvider'
import { mainnetProvider, sepoliaProvider } from '@/utils/rpc-provider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Home() {
  const initailState =
    '0x031b79a7d00cae6fba1c6c2da59c00ea8764eeff1235b8115ed04229211c590e'

  const [contractAddress, setContractAddress] = useState<string>(initailState)
  const { isMounted } = useAbi(contractAddress)
  const router = useRouter()
  const { network, setNetwork, setRpcProvider } = useNetProvider()

  const handleNetWork = (value: string) => {
    if (value === 'mainnet') {
      setNetwork('mainnet')
      setRpcProvider(mainnetProvider)
    } else if (value === 'sepolia') {
      setNetwork('sepolia')
      setRpcProvider(sepoliaProvider)
    }
  }

  const handleLoad = () => {
    try {
      router.push(`/abiform/${contractAddress}`)
      toast.success('ABI loaded')
    } catch (e) {
      console.error(e)
      toast.error('Invalid ABI')
    }
  }

  return (
    <div className="fixed inset-0 bg-muted/50 backdrop-blur-sm flex items-center justify-center bg-slate-100">
      <Card className="rounded-lg shadow-lg p-8 w-full max-w-md bg-slate-300">
        <CardHeader className="space-y-4">
          <CardTitle className="text-4xl font-bold flex items-center justify-center">
            Space ABI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground flex items-center justify-center">
            Interact with contract on Starknet.
          </p>
          <div className="flex justify-center mt-6 mb-4">
            <Select value={network} onValueChange={handleNetWork}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mainnet">Mainnet</SelectItem>
                <SelectItem value="sepolia">Sepolia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            onChange={(e) => setContractAddress(e.target.value)}
            value={contractAddress}
            placeholder="enter ur contarct address"
            className="border-2 border-slate p-4 mt-4"
            required
          />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          {isMounted ? (
            <Button onClick={handleLoad}>Load Contract</Button>
          ) : (
            <Button disabled>Load Contract</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
