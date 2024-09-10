'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { shortenAddress } from '@/utils'
import { useAccount, useDisconnect } from '@starknet-react/core'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'react-use'
import { ClipboardCopy, LogOut } from 'lucide-react'

export function DisConnectModel() {
  const { disconnect } = useDisconnect()
  const [state, copyToClipboard] = useCopyToClipboard()

  const { address } = useAccount()
  const shortAddr = shortenAddress(address)

  useEffect(() => {
    if (state.value) {
      toast.success(`Copied successfully!`)
    }
    if (state.error) {
      toast.error(`Unable to copy value, ${state.error.message}`)
    }
  }, [state])

  const buttonClasses = "bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={buttonClasses}>{shortAddr}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white rounded-lg shadow-lg">
        <DropdownMenuItem 
          onClick={() => copyToClipboard(address!)}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <ClipboardCopy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 border-gray-200" />
        <DropdownMenuItem 
          onClick={() => disconnect()}
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}