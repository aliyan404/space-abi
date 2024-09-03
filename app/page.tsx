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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import '@/style/home.css'
import { isAbiValid } from '@/utils/abi'
import { Github } from 'lucide-react'
import QuickItem from './components/QuickItem'
import { quickAccess } from '@/utils'
import { getRpcProvider } from '@/utils/rpcProvider'

export default function Home() {
  const router = useRouter()
  const [baseMsg, setBaseMsg] = useState<any>({
    network: 'mainnet',
    address: '',
  })
  const [isValid, setIsValid] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const { address, network } = baseMsg
      if (address && network) {
        await isAbiValid(address, getRpcProvider(network)).then((res) => {
          setIsValid(res)
        })
      }
    }

    fetchData()
  }, [baseMsg])

  const handleNetWork = (value: string) => {
    setBaseMsg({ ...baseMsg, network: value })
  }

  const handleAddress = async (e: any) => {
    setBaseMsg({ ...baseMsg, address: e.target.value })
    const res = await isAbiValid(
      e.target.value,
      getRpcProvider(baseMsg.network)
    )
    setIsValid(res === true)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if (baseMsg.address && baseMsg.network) {
        const res = await isAbiValid(
          baseMsg.address,
          getRpcProvider(baseMsg.network)
        )

        if (res === true) {
          router.push(`/${baseMsg.network}/${baseMsg.address}`)
          toast.success('ABI loaded')
        } else {
          toast.error('Invalid ABI')
          return
        }
      }
    } catch (error) {
      console.log('Confirm Abi error', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-animate flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="p-6 pb-0">
          <CardTitle className="text-4xl font-bold text-center text-blue-600">
            Space ABI
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <p className="text-gray-600 text-center">
              Interact with contracts on Starknet.
            </p>
            <div className="flex justify-center">
              <Select value={baseMsg.network} onValueChange={handleNetWork}>
                <SelectTrigger className="w-48 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-xl">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mainnet">Mainnet</SelectItem>
                  <SelectItem value="sepolia">Sepolia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              onChange={handleAddress}
              value={baseMsg.address}
              placeholder="Enter contract address"
              className="w-full bg-white border-gray-300 focus:outline-none focus:ring-2 focus:border-indigo-500"
              required
            />
          </CardContent>
          <CardFooter className="p-2 flex flex-col items-center">
            <Button
              type="submit"
              disabled={!isValid || !baseMsg.address || !baseMsg.network}
              className="w-48 h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              Load Contract
            </Button>
            <div className="mt-10 flex flex-col items-center">
              <span className="text-xl">Quick access</span>
              <div className="flex justify-center items-center mt-2">
                {quickAccess.map((i: any) => {
                  return <QuickItem key={i.name} item={i} />
                })}
              </div>
            </div>
            <div className="mt-5">
              <a
                href="https://github.com/aliyan404/space-abi.git"
                className="mt-4 mb-2 flex items-center text-blue-600 underline"
              >
                <Github size={20} />
                Fork me
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
