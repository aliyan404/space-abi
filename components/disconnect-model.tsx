'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { shortenAddress } from '@/utils'
import { useAccount, useDisconnect } from '@starknet-react/core'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'react-use'

export function DisConnectModel() {
  const { disconnect } = useDisconnect()
  const [state, copyToClipboard] = useCopyToClipboard()

  const { address } = useAccount()
  const shortAddr = shortenAddress(address)

  useEffect(() => {
    if (state.value) {
      toast.success(`Copied ${state.value}`)
    }
    if (state.error) {
      toast.error(`Unable to copy value, ${state.error.message}`)
    }
  }, [state])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">{shortAddr}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem onSelect={() => copyToClipboard(address!)}>
          Copy Address
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem onSelect={() => disconnect()}>
          DisConnect
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
