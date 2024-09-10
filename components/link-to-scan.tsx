import { Link } from 'lucide-react'
import React, { useCallback } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { Button } from './ui/button'

export default function LinkToScan({
  network,
  contractAddress,
}: {
  network: string
  contractAddress: string
}) {
  const handleLink = useCallback(() => {
    window.open(
      `https://${
        network === 'sepolia' ? 'sepolia.' : ''
      }starkscan.co/contract/${contractAddress}`
    )
  }, [network, contractAddress])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={handleLink}
            className="p-1 text-xs text-gray-400 hover:text-gray-500 bg-transparent hover:bg-transparent border-none translate-y-[2px]"
          >
            <Link className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="end">
          <p className="text-sm text-gray-500">View on Starkscan</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
