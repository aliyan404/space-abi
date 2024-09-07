'use client'

import { ArrowLeftRight } from 'lucide-react'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export default function DevideBtn({
  onDevide,
  isDivided,
}: {
  onDevide: any
  isDivided: boolean
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={onDevide}
            className="p-1 text-xs text-gray-400 hover:text-gray-500 bg-transparent hover:bg-transparent border-none translate-y-[2px]"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <p className="text-sm text-gray-500">
            {isDivided ? 'Multiply' : 'Devide'} by 1e18
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
