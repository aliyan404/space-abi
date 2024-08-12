'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { X } from 'lucide-react'

export default function FunctionItem({
  fnMsg,
  onDelete,
}: {
  fnMsg: any
  onDelete: any
}) {
  console.log('fnMsg:', fnMsg)

  return (
    <div className="bg-gray-600 flex flex-col p-2 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">{fnMsg.name}</div>
        <Button onClick={() => onDelete(fnMsg)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div>
        {fnMsg?.inputs?.map((input: any, index: any) => {
          return (
            <div key={index}>
              <div className="flex justify-start">
                <div className='mr-4'>{input.name}</div>
                <div>{input.type}</div>
              </div>
              <Input placeholder={input.name} />
            </div>
          )
        })}
      </div>
      <div>
        {fnMsg?.state_mutability === 'view' ? (
          <Button>Read</Button>
        ) : (
          <Button>Wrtie</Button>
        )}
      </div>
    </div>
  )
}
