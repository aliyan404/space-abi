'use client'

import { Button } from '@/components/ui/button'
import { isAbiValid } from '@/utils/abi'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function QuickItem({
  item,
  rpcProvider,
}: {
  item: any
  rpcProvider: any
}) {
  const router = useRouter()
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      if (item.address && rpcProvider) {
        const res = await isAbiValid(item.address, rpcProvider)

        if (res === true) {
          router.push(`/${item.network}/${item.address}`)
          toast.success('ABI loaded')
        } else {
          toast.error('Invalid ABI')
        }
      }
    } catch (error) {
      console.log('Confirm Abi error', error)
    }
  }

  return <Button className='text-md hover:no-underline' variant='link' size='sm' onClick={handleClick}>{item.name}</Button>
}
