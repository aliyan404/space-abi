'use client'

import { AddrContext } from '@/components/addrContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

export default function Home() {
  const [contractAddress, setContractAddress] = useState<string>(
    '0x031b79a7d00cae6fba1c6c2da59c00ea8764eeff1235b8115ed04229211c590e'
  )
  const router = useRouter()

  const handleLoad = () => {
    router.push(`/abiform/${contractAddress}`)
  }
  return (
    <div className="fixed inset-0 bg-muted/50 backdrop-blur-sm flex items-center justify-center">
      <div className="rounded-lg shadow-lg p-8 w-full max-w-md bg-slate-300">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Space ABI</h2>
          <p className="text-muted-foreground">
            Interact with contract on Starknet.
          </p>
          <Input
            onChange={(e) => setContractAddress(e.target.value)}
            value={contractAddress}
            placeholder="enter ur contarct address"
            className="border-2 border-slate p-4"
          />
          <Button className="w-full" onClick={handleLoad}>
            Relax
          </Button>
        </div>
      </div>
    </div>
  )
}
