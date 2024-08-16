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
import { mainnetProvider, sepoliaProvider } from '@/components/rpc-provider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import '@/style/home.css'

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
    <div className="fixed inset-0 bg-gradient-animate flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="p-6">
          <CardTitle className="text-3xl font-bold text-center text-blue-600">
            Space ABI
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <p className="text-gray-600 text-center">
            Interact with contracts on Starknet.
          </p>
          <div className="flex justify-center">
            <Select value={network} onValueChange={handleNetWork}>
              <SelectTrigger className="w-48 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500">
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
            placeholder="Enter contract address"
            className="w-full bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />
        </CardContent>
        <CardFooter className="p-6 flex justify-center">
          <Button
            onClick={handleLoad}
            disabled={!isMounted}
            className="w-48 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            {isMounted ? 'Load Contract' : 'Loading...'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
