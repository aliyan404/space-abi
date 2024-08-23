'use client'

import toast from 'react-hot-toast'
import { Button } from './ui/button'
import { CopyIcon } from 'lucide-react'

export default function CopyBtn({ value }: { value: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="ml-2 p-0 h-auto w-auto hover:bg-transparent focus:ring-0 transition-transform active:scale-90"
      onClick={() => {
        navigator.clipboard.writeText(value)
        toast.success('Copied successfully')
      }}
    >
      <CopyIcon className="h-3 w-3" />
    </Button>
  )
}
