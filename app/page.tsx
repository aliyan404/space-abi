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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const [contractAddress, setContractAddress] = useState<string>(
    '0x031b79a7d00cae6fba1c6c2da59c00ea8764eeff1235b8115ed04229211c590e'
  )
  const router = useRouter()

  const handleLoad = () => {
    router.push(`/abiform/${contractAddress}`)
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
          <Input
            onChange={(e) => setContractAddress(e.target.value)}
            value={contractAddress}
            placeholder="enter ur contarct address"
            className="border-2 border-slate p-4 mt-10"
          />
        </CardContent>
        <CardFooter className='flex items-center justify-center'>
          <Button  onClick={handleLoad}>
            Load Contract
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
